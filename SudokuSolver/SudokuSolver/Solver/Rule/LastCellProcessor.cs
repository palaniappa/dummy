using Sudoku.Model;
using SudokuSolver.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SudokuSolver.Solver.Rule
{
	public class LastCellProcessor : ISudokuProcessor
	{
		Board board;
		public LastCellProcessor(Board b)
		{
			this.board = b;
		}

		public bool process(IBoardPortion p,Dictionary<Cell, Cell> processedInvalidCells)
		{
			bool valueSet = false;
			uint t = p.getRemainingCount();
			if(t == 1)
			{
				var n = p.getNextMissingNumber();
				var cell = p.getNextFreeCell();
				if(cell != null)
				{
					cell.setVal(n);
					valueSet = true;
				}
			}
			return valueSet;
		}
	}
}
