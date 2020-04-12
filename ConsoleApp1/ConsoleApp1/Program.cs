using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
	class Program
	{
		public static string getChar(int no) // 2, 24
		{
			if (no < 0 || no > 26)
				return null;
			return Char.ConvertFromUtf32(64 + no); //b, x
		}

		public static void getNextCombination(string input, Dictionary<string, List<string>> dp, List<string> results, int idx, int count)
		{
			if(idx + count <= input.Length)
			{
				var x = getChar(int.Parse(input.Substring(idx, count)));
				if (x != null)
				{
					var nextResults = DecodeString(input, dp, idx + count);
					if (nextResults != null)
					{
						nextResults.ForEach(e =>
						{
							results.Add(x + e);
						});
					}
					else
					{
						results.Add(x);
					}
				}
			}
			
		}

		public static List<string> DecodeString(string input, Dictionary<string,List<string>> dp, int idx = 0) // 2418, 1,2,3,4
		{
			if (idx >= input.Length)
				return null;
			string key = input.Substring(idx);
			if (dp.ContainsKey(key))
			{
				return dp[key];
			}
			List<string> newResults = new List<string>();
			getNextCombination(input, dp, newResults, idx, 1);
			getNextCombination(input, dp, newResults, idx, 2);
			dp[key] = newResults;
			return newResults;

		}

		public static void RunDecodeAlgo()
		{
			//given numbers 1->a, 2->b, 3->c,.... 26->z.
			//Also given a number like 2418 find all possible ways to decode to different string 2,4,1,8 or 24,1,8 or, 24, 18, 2, 18 etc
			var testString = "2418";
			Dictionary<string,List<string>> dp = new Dictionary<string, List<string>>();
			var result = DecodeString(testString, dp, 0);
		}

		public static void Main(string[] args)
		{
			//RunDecodeAlgo();
			//var r = getSliceCount(4, new List<int>() { 3, 6, 11, 5 });
			//var failProbabilty = getFailPropbability(13);
			//var r = commonChild("SHINCHAN", "NOHARAAA");
			var r = commonChild("ABCD", "ABDC");
		}

		static int commonChild(string s1, string s2)
		{
			int l1 = s1.Length;
			int l2 = s2.Length;
			int[][] states = new int[l1][];
			for(int i = 0; i < l1; ++i)
			{
				states[i] = new int[l2];
			}

			for(int i = 0; i < s1.Length; ++i)
			{
				for(int j=0;j<s2.Length;++j)
				{
					int prevJSkipValue = 0;
					int prevISkipValue = 0;
					int prevContinuousValue = 0;
					if(i > 0)
					{
						prevISkipValue = states[i - 1][j];
					}
					if(j>0)
					{
						prevJSkipValue = states[i][j - 1];
					}
					if(i > 0 && j > 0)
					{
						prevContinuousValue = states[i - 1][j - 1];
					}

					if(s1[i] == s2[j])
					{
						states[i][j] = prevContinuousValue + 1;
					}
					else
					{
						states[i][j] = Math.Max(prevISkipValue, prevJSkipValue);
					}
				}
			}

			return states[l1 - 1][l2 - 1];
		}

		//static int commonChild(string s1, string s2)
		//{
		//	Dictionary<string, int> dp = new Dictionary<string, int>();
		//	return commonChild(s1, s2, dp);
		//}

		//static int commonChild(string s1, string s2, Dictionary<string, int> dp)
		//{
		//	if (s1.Length == 0 || s2.Length == 0)
		//		return 0;

		//	string key = s1 + ":" + s2;
		//	if (dp.ContainsKey(key))
		//		return dp[key];

		//	int currentCount = 0;
		//	if(s1[0] == s2[0])
		//	{
		//		currentCount++;
		//	}

		//	var s1Remaining = s1.Substring(1);
		//	var s2Remaining = s2.Substring(1);
		//	var r1 = currentCount + commonChild(s1Remaining, s2Remaining, dp);
		//	var r2 = commonChild(s1, s2Remaining, dp);
		//	var r3 = commonChild(s1Remaining, s2, dp);
		//	var result = Math.Max(Math.Max(r1, r2), r3);
		//	dp[key] = result;
		//	return result;
		//}

		public static double getFailPropbability(int input)
		{
			if(input >= 21)
			{
				return 100;
			}

			int diff = 21 - input;
			return (double)(10 - diff) / 10;
		}

		public static int getSliceCount(int n, List<int> sliceCounts)
		{
			int minAmount = 0;
			int maxAmount = 0;

			//find the min
			sliceCounts.ForEach(c => {
				if (minAmount == 0 || minAmount > c)
				{
					minAmount = c;
				}

				if(c > maxAmount)
				{
					maxAmount = c;
				}
			});

			int prevSuccessfullAllocation = -1;
			int currentAllocation = 0;
			bool done = false;
			while (minAmount<maxAmount && !done)
			{
				currentAllocation = (minAmount + maxAmount) / 2;
				if(currentAllocation != prevSuccessfullAllocation)
				{
					int peopleAlloted = 0;
					List<int> currentSliceCounts = new List<int>(sliceCounts);
					int currentSliceIdx = 0;
					bool canAssign = true;
					while (peopleAlloted < n && canAssign)
					{
						canAssign = false;
						while (currentSliceIdx < currentSliceCounts.Count && currentSliceCounts[currentSliceIdx] < (currentAllocation))
						{
							currentSliceIdx++;
						}
						if (currentSliceIdx < currentSliceCounts.Count && currentSliceCounts[currentSliceIdx] >= (currentAllocation))
						{
							currentSliceCounts[currentSliceIdx] -= (currentAllocation);
							peopleAlloted++;
							canAssign = true;
						}
					}
					if (peopleAlloted == n)
					{
						minAmount = currentAllocation;
						prevSuccessfullAllocation = currentAllocation;
					}
					else
					{
						maxAmount = currentAllocation;
					}
				}
				else
				{
					done = true;
				}
				
			}
			return prevSuccessfullAllocation;
		}

		//private static int parent(int i)
		//{
		//	return (i-1) / 2;
		//}
		//private static int left(int i)
		//{
		//	return (2 * i) + 1;
		//}
		//private static int right(int i)
		//{
		//	return (2 * i) + 2;
		//}

		//public static void Main(string[] args)
		//{
		//	int countOfQueries = int.Parse(Console.ReadLine());
		//	List<int> heap = new List<int>();	
		//	for(int i=0;i< countOfQueries;++i)
		//	{
		//		string command = Console.ReadLine();
		//		var items = command.Split(' ');
		//		if(items[0] == "1")
		//		{
		//			int data = int.Parse(items[1]);

		//		}
		//	}
		//}
		//private static int find(List<int> heap, int data)
		//{

		//}
		//private static void delete(List<int> heap, int data)
		//{
		//	int idx = find(heap, data);
		//	heap[idx] = int.MinValue;
		//}
		//private static void insert(List<int> heap, int data)
		//{
		//	heap.Add(data);
		//	int idx = heap.Count() - 1;
		//	heapifyup(heap, idx);
		//}

		//private static void heapifyup(List<int> heap, int idx)
		//{
		//	while (idx > 0)
		//	{
		//		int parentIndex = parent(idx);
		//		if (heap[idx] < heap[parentIndex])
		//		{
		//			int temp = heap[idx];
		//			heap[idx] = heap[parentIndex];
		//			heap[parentIndex] = temp;
		//		}
		//		else
		//		{
		//			break;
		//		}
		//	}
		//}

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
