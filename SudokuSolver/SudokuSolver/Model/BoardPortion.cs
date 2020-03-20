using Sudoku.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SudokuSolver.Model
{
	public abstract class BoardPortion
	{
		private uint remainingCount = 0;
		private uint totalCount = 0;

		private Board board;
		protected Dictionary<uint, bool> numbersPresent = new Dictionary<uint, bool>();
		public BoardPortion(Board b)
		{
			this.board = b;
			this.totalCount = b.maxN;
			this.remainingCount = b.maxN;
			for (uint i = 1; i <= b.maxN; ++i)
			{
				numbersPresent[i] = false;
			}
		}

		protected void setNumberPresence(uint n)
		{
			if (numbersPresent[n] == true)
				throw new Exception($"The number {n} is already set to true");
			numbersPresent[n] = true;
		}

		public bool getNumberPresence(uint n)
		{
			return numbersPresent[n];
		}

		public Board getBoard()
		{
			return this.board;
		}

		public uint getNextMissingNumber()
		{
			for (uint i = 1; i <= this.getBoard().maxN; ++i)
			{
				bool noPresent = getNumberPresence(i);
				if (noPresent == false)
				{
					return i;
				}
			}
			return 0;
		}

		public void notify(ChangeNotification change, int i, int j, uint val)
		{
			if (change == ChangeNotification.VALUE_SET)
			{
				this.setNumberPresence(val);
				this.remainingCount--;
			}
		}

		public uint getRemainingCount()
		{
			return this.remainingCount;
		}

		
	}
}
