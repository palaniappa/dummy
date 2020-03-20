using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using com.xcompany.filesystem;
using com.xcompany.filesystem.command;

namespace com.xcompany.filesystem
{
	public interface IFileSystemComponent
	{
		string name { get; set; }
		IDirectory getParent();
	}

	public interface IDirectory : IFileSystemComponent
	{
		IList<IFileSystemComponent> getChildren();
		void addChild(IFileSystemComponent fileSystemComponent);
	}

	interface IFile : IFileSystemComponent
	{

	}

	abstract class FileSystemComponent
	{
		public FileSystemComponent(string name, IDirectory parent)
		{
			if (name.Length > 100)
				throw new FileSystemException("Invalid File or Folder Name");

			this.m_name = name;
			this.m_parent = parent;
		}
		private IDirectory m_parent = null;
		private string m_name;
		public string name { get => this.m_name; set => this.m_name = value; }
		public IDirectory getParent()
		{
			return this.m_parent;
		}

	}

	class Directory : FileSystemComponent, IDirectory
	{
		public List<IFileSystemComponent> m_childItems;
		public Directory(string name, IDirectory parent) : base(name,parent)
		{
			m_childItems = new List<IFileSystemComponent>();
		}

		

		public IList<IFileSystemComponent> getChildren()
		{
			return m_childItems.AsReadOnly();
		}

		public void addChild(IFileSystemComponent fileSystemComponent)
		{
			if (fileSystemComponent == null)
				throw new FileSystemException("Unexpected! fscomponent cannot be null");
			this.m_childItems.Add(fileSystemComponent);
		}
	}

	class File : FileSystemComponent, IFile
	{
		public File(string name, IDirectory parent) : base(name,parent)
		{

		}
	}

	public interface IFileSystem
	{
		string getCurrentWorkingDirectoryPath();
		void createDirectory(string name);
		void changeDirectory(string name);

		void createFile(string name);
		IDirectory getCurrentDirectory();
	}

	class FileSystem : IFileSystem
	{
		public const string PATH_SEPARATOR = "/";
		private List<IFileSystemComponent> m_contents = new List<IFileSystemComponent>();
		private IDirectory m_rootDirectory = null;
		private IDirectory m_currentWorkingDirectory = null;
		public FileSystem()
		{
			//default constructor. Initialize with default root directory
			m_rootDirectory = new Directory("root",null);
			m_currentWorkingDirectory = m_rootDirectory;
			m_contents.Add(m_rootDirectory);
		}

		public string getCurrentWorkingDirectoryPath()
		{
			if (m_currentWorkingDirectory == null)
				throw new Exception("Unexpected! current working directory cannot be null");
			return traverseToRoot(m_currentWorkingDirectory);
		}

		private string traverseToRoot(IFileSystemComponent fileSystemComponent)
		{
			if (fileSystemComponent == null)
				return "";
			return traverseToRoot(fileSystemComponent.getParent()) + PATH_SEPARATOR + fileSystemComponent.name;
		}

		public void createDirectory(string name)
		{
			if (m_currentWorkingDirectory == null)
				throw new Exception("Unexpected! current working directory cannot be null");
			foreach(var fsComponent in m_currentWorkingDirectory.getChildren())
			{
				if (fsComponent.name == name)
					throw new FileSystemException("Directory already exists");
			}
			IDirectory newDirectory = new Directory(name, m_currentWorkingDirectory) { };
			m_currentWorkingDirectory.addChild(newDirectory);
		}

		public void changeDirectory(string name)
		{
			if (m_currentWorkingDirectory == null)
				throw new Exception("Unexpected! current working directory cannot be null");
			if(name == "..")
			{
				var parent = m_currentWorkingDirectory.getParent();
				if(parent != null)
				{
					m_currentWorkingDirectory = parent;
				}
			}
			else
			{
				bool directoryFound = false;
				foreach (var fsComponent in m_currentWorkingDirectory.getChildren())
				{
					if (fsComponent.name == name && fsComponent is IDirectory)
					{
						directoryFound = true;
						m_currentWorkingDirectory = fsComponent as IDirectory;
						break;
					}
						
				}
				if(directoryFound == false)
				{
					throw new FileSystemException("Directory not found");
				}
			}
			
		}

		public void createFile(string name)
		{
			if (m_currentWorkingDirectory == null)
				throw new Exception("Unexpected! current working directory cannot be null");
			IFile newFile = new File(name, m_currentWorkingDirectory) { };
			m_currentWorkingDirectory.addChild(newFile);
		}

		public IDirectory getCurrentDirectory()
		{
			return m_currentWorkingDirectory;
		}
	}

	public class FileSystemException : Exception
	{
		public FileSystemException(string message) : base (message)
		{

		}
	}
}

namespace com.xcompany.filesystem.command
{
	public interface IResultNotifier
	{
		void showResult(string result);
	}

	public interface IParameter
	{
		string optionOrValue { get; set; }
	}

	public class SimpleParameter : IParameter
	{
		private string m_optionOrValue;
		public string optionOrValue { get => m_optionOrValue; set => this.m_optionOrValue = value; }
	}

	interface ICommand
	{
		void execute(IFileSystem fileSystem);
	}

	public abstract class Command : ICommand
	{
		protected IResultNotifier m_resultNotifier;
		protected List<IParameter> m_parameters;
		public Command(List<IParameter> parameters, IResultNotifier resultNotifier)
		{
			this.m_resultNotifier = resultNotifier;
			this.m_parameters = parameters;
		}
		protected void notify(string status)
		{
			if (this.m_resultNotifier != null)
			{
				this.m_resultNotifier.showResult(status);
			}
		}
		public void execute(IFileSystem fileSystem)
		{
			string error;
			if (!this.validateParametersImpl(out error))
			{
				notify(error);
			}
			try
			{
				executeImpl(fileSystem);
			}
			catch(FileSystemException e)
			{
				notify(e.Message);
			}
			
		}

		public abstract void executeImpl(IFileSystem fileSystem);
		public abstract bool validateParametersImpl(out string error);
	}



	public class PwdCommand : Command
	{
		public PwdCommand(List<IParameter> parameters, IResultNotifier resultNotifier) : base(parameters, resultNotifier)
		{

		}
		public override void executeImpl(IFileSystem fileSystem)
		{
			string pwd = fileSystem.getCurrentWorkingDirectoryPath();
			notify(pwd);
		}

		public override bool validateParametersImpl(out string error)
		{
			//right now no parameters are supported
			error = "";
			if (this.m_parameters != null && this.m_parameters.Count > 0)
			{
				error = "Invalid Command";
				return false;
			}
			return true;
		}
	}

	public class LsCommand : Command
	{
		public LsCommand(List<IParameter> parameters, IResultNotifier resultNotifier) : base(parameters, resultNotifier)
		{

		}
		public override void executeImpl(IFileSystem fileSystem)
		{
			var dir = fileSystem.getCurrentDirectory();
			foreach(var fsComponent in dir.getChildren())
			{
				notify(fsComponent.name);
			}
			
		}

		public override bool validateParametersImpl(out string error)
		{
			//right now no parameters are supported
			error = "";
			if (this.m_parameters != null && this.m_parameters.Count > 0)
			{
				error = "Invalid Command";
				return false;
			}
			return true;
		}
	}

	public class MkdirCommand : Command
	{
		public MkdirCommand(List<IParameter> parameters, IResultNotifier resultNotifier) : base(parameters, resultNotifier)
		{

		}
		public override void executeImpl(IFileSystem fileSystem)
		{
			fileSystem.createDirectory(m_parameters[0].optionOrValue);

		}

		public override bool validateParametersImpl(out string error)
		{
			//right now no parameters are supported
			error = "";
			if (this.m_parameters == null || this.m_parameters.Count != 1 || String.IsNullOrWhiteSpace(this.m_parameters[0].optionOrValue))
			{
				error = "Invalid Command";
				return false;
			}
			return true;
		}
	}

	public class TouchCommand : Command
	{
		public TouchCommand(List<IParameter> parameters, IResultNotifier resultNotifier) : base(parameters, resultNotifier)
		{

		}
		public override void executeImpl(IFileSystem fileSystem)
		{
			fileSystem.createFile(m_parameters[0].optionOrValue);

		}

		public override bool validateParametersImpl(out string error)
		{
			//right now no parameters are supported
			error = "";
			if (this.m_parameters == null || this.m_parameters.Count != 1 || String.IsNullOrWhiteSpace(this.m_parameters[0].optionOrValue))
			{
				error = "Invalid Command";
				return false;
			}
			return true;
		}
	}

	public class CdCommand : Command
	{
		public CdCommand(List<IParameter> parameters, IResultNotifier resultNotifier) : base(parameters, resultNotifier)
		{

		}
		public override void executeImpl(IFileSystem fileSystem)
		{
			fileSystem.changeDirectory(m_parameters[0].optionOrValue);

		}

		public override bool validateParametersImpl(out string error)
		{
			//right now no parameters are supported
			error = "";
			if (this.m_parameters == null || this.m_parameters.Count != 1 || String.IsNullOrWhiteSpace(this.m_parameters[0].optionOrValue))
			{
				error = "Invalid Command";
				return false;
			}
			return true;
		}
	}

}

namespace ConsoleApp2
{
	class ResultNotifier : IResultNotifier
	{
		public void showResult(string result)
		{
			Console.WriteLine(result);
		}
	}

	class Program
	{
		static void Main(string[] args)
		{
			IResultNotifier notifier = new ResultNotifier();
			IFileSystem fileSystem = new FileSystem();
			
			string[] commandTokens = null;
			string command = "QUIT";
			do
			{
				commandTokens = Console.ReadLine().Split(' ');

				command = commandTokens[0].ToUpper();

				List<IParameter> parameters = new List<IParameter>();
				for(int i=1;i<commandTokens.Length;++i)
				{
					parameters.Add(new SimpleParameter() { optionOrValue = commandTokens[i] });
				}

				ICommand commandObject = null;
				//TODO use abstract definition factory to create the command objects
				if (command == "PWD")
				{
					commandObject = new PwdCommand(parameters, notifier);
					
				}
				else if (command == "LS")
				{
					commandObject = new LsCommand(parameters, notifier);

				}
				else if(command == "MKDIR")
				{
					commandObject = new MkdirCommand(parameters, notifier);
				}
				else if (command == "TOUCH")
				{
					commandObject = new TouchCommand(parameters, notifier);
				}
				else if (command == "CD")
				{
					commandObject = new CdCommand(parameters, notifier);
				}
				else if(command == "QUIT")
				{
					break;
				}
				else
				{
					notifier.showResult("Unrecognized command");
				}
				if(commandObject != null)
				{
					commandObject.execute(fileSystem);
				}
				

			} while (true);
			
			
		}
	}
}
