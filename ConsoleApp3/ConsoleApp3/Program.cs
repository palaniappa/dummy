using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp3
{
	class Program
	{
		class Node
		{
			public Node(int key, long value)
			{
				this.key = key;
				this.value = value;
			}

			public int key;
			public long value;

			public Node left;
			public Node right;
		}
		class BST
		{
			Node m_head;
			long m_maxValue = 0;

			public long getMax()
			{
				m_maxValue = 0;
				long currentValue = 0;
				inorderTraversal(m_head, (int k, long v) => {
					currentValue += v;
					updateMax(currentValue);
					return 0;
				});
				return m_maxValue;
			}

			private void updateMax(long value)
			{
				if(m_maxValue < value)
				{
					m_maxValue = value;
				}
			}

			public void add(int key, long value)
			{
				if (m_head == null)
				{
					m_head = new Node(key, value);
					return;
				}

				addImpl(m_head, key, value);
			}

			private void inorderTraversal(Node root, Func<int,long, int > action)
			{
				if (root == null)
					return;
				inorderTraversal(root.left, action);
				action(root.key, root.value);
				inorderTraversal(root.right, action);
			}

			private void addImpl(Node root, int key, long value)
			{
				if (root == null)
					return;

				if(root.key == key)
				{
					root.value += value;
					return;
				}
				if(key < root.key)
				{
					if (root.left == null)
					{
						root.left = new Node(key, value);
					}
					else
						addImpl(root.left, key, value);
				}
				else if(key > root.key)
				{
					if (root.right == null)
					{
						root.right = new Node(key, value);
					}
					else
						addImpl(root.right, key, value);
				}
			}

		}

		static void Main(string[] args)
		{
			int n = 10;
			int[][] queries = new int[4][];
			for (int i = 0; i < queries.Length; ++i)
			{
				queries[i] = new int[3];
			}
			queries[0][0] = 2;
			queries[0][1] = 6;
			queries[0][2] = 8;

			queries[1][0] = 3;
			queries[1][1] = 5;
			queries[1][2] = 7;

			queries[2][0] = 1;
			queries[2][1] = 8;
			queries[2][2] = 1;

			queries[3][0] = 5;
			queries[3][1] = 9;
			queries[3][2] = 15;

			var value = arrayManipulation(n, queries);
			Console.WriteLine(value);

			//StreamReader sr = new StreamReader(@"C:\Users\pamaniv\source\repos\ConsoleApp3\ConsoleApp3\TestCase13.txt");
			//string line = sr.ReadLine();
			//string[] nm = line.Split();

			//int n = Convert.ToInt32(nm[0]);

			//int m = Convert.ToInt32(nm[1]);

			//int[][] queries = new int[m][];

			//for (int i = 0; i < m; i++)
			//{
			//	queries[i] = Array.ConvertAll(sr.ReadLine().Split(' '), queriesTemp => Convert.ToInt32(queriesTemp));
			//}

			//sr.Close();
			//Stopwatch sw = Stopwatch.StartNew();
			//long result = arrayManipulation(n, queries);
			//sw.Stop();
			//Console.WriteLine(result);
			//Console.WriteLine(sw.ElapsedMilliseconds);
		}

		static long arrayManipulation(int n, int[][] queries)
		{
			BST bst = new BST();
			foreach (var q in queries)
			{
				var startIdx = q[0];
				var endIdx = q[1]+1;
				var value = q[2];
				bst.add(startIdx, value);
				bst.add(endIdx, (-1 * value));
			}
			return bst.getMax();
		}
	}
}
