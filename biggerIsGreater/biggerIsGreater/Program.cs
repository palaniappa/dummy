using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace biggerIsGreater
{
	class Program
	{
		static string biggerIsGreater(string w)
		{
			var word = w.ToCharArray();
			int swapSourceIdx = w.Length - 2;
			int swapTargetIdx = w.Length - 1;
			
			do
			{
				if(swapTargetIdx > swapSourceIdx && swapSourceIdx > -1 && w[swapTargetIdx] > w[swapSourceIdx])
				{
					char t = word[swapTargetIdx];
					word[swapTargetIdx] = word[swapSourceIdx];
					word[swapSourceIdx] = t;

					var remainingItems = word.Skip(swapSourceIdx + 1);

					var r = new string(word.Take(swapSourceIdx+1).ToArray());
					var reaminingSorted = remainingItems.OrderBy(a => a);
					r += new string(reaminingSorted.ToArray());
					return r;
				}
				swapTargetIdx--;
				if(swapTargetIdx <= swapSourceIdx)
				{
					swapSourceIdx--;
					swapTargetIdx = w.Length - 1;
				}
			} while (swapSourceIdx > -1 && swapTargetIdx > 0);
			return "no answer";
		}
		static void Main(string[] args)
		{
			string w = "dkhc";
			string r = biggerIsGreater(w);
			Console.WriteLine(r);
		}
	}
}
