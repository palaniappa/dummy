using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
	class Program
	{

		private static int parent(int i)
		{
			return (i-1) / 2;
		}
		private static int left(int i)
		{
			return (2 * i) + 1;
		}
		private static int right(int i)
		{
			return (2 * i) + 2;
		}

		public static void Main(string[] args)
		{
			int countOfQueries = int.Parse(Console.ReadLine());
			List<int> heap = new List<int>();	
			for(int i=0;i< countOfQueries;++i)
			{
				string command = Console.ReadLine();
				var items = command.Split(' ');
				if(items[0] == "1")
				{
					int data = int.Parse(items[1]);
					
				}
			}
		}
		private static int find(List<int> heap, int data)
		{

		}
		private static void delete(List<int> heap, int data)
		{
			int idx = find(heap, data);
			heap[idx] = int.MinValue;
		}
		private static void insert(List<int> heap, int data)
		{
			heap.Add(data);
			int idx = heap.Count() - 1;
			heapifyup(heap, idx);
		}

		private static void heapifyup(List<int> heap, int idx)
		{
			while (idx > 0)
			{
				int parentIndex = parent(idx);
				if (heap[idx] < heap[parentIndex])
				{
					int temp = heap[idx];
					heap[idx] = heap[parentIndex];
					heap[parentIndex] = temp;
				}
				else
				{
					break;
				}
			}
		}

		//class Item
		//{
		//	public char c;
		//	public Dictionary<char, Item> childItems = new Dictionary<char, Item>();
		//	int count = 0;
		//}

		//static void Main(string[] args)
		//{
		//	var count = int.Parse(Console.ReadLine());
		//	List<string> strings = new List<string>();
		//	for (int i = 0; i < count; ++i)
		//	{
		//		strings.Add(Console.ReadLine());
		//	}

		//	Dictionary<char, Item> roots = new Dictionary<char, Item>();
		//	foreach (string s in strings)
		//	{
		//		Item path = null;
		//		for (int i = 0; i < s.Length; ++i)
		//		{
		//			Item itemToCheck = null;
		//			char c = s[i];
		//			if (path == null)
		//			{
		//				if (roots.ContainsKey(c) == false)
		//				{
		//					roots[c] = new Item() { c = c };
		//				}
		//				else
		//				{
		//					itemToCheck = roots[c];
		//				}

		//				path = roots[c];
		//			}
		//			else
		//			{
		//				if (!path.childItems.ContainsKey(c))
		//				{
		//					path.childItems[c] = new Item() { c = c };
		//				}
		//				else
		//				{
		//					itemToCheck = path.childItems[c];
		//				}
		//				path = path.childItems[c];
		//			}

		//			if ( 
		//				(itemToCheck != null && itemToCheck.childItems.Count == 0)
		//				|| (i+1 == s.Length && itemToCheck != null && itemToCheck.childItems.Count() != 0)
		//				)
		//			{
		//				Console.WriteLine("BAD SET");
		//				Console.WriteLine(s);
		//				return;
		//			}
		//		}
		//	}
		//	Console.WriteLine("GOOD SET");
		//}
	}
}
