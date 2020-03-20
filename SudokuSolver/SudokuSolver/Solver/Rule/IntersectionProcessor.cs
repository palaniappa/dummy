using Sudoku.Model;
using SudokuSolver.Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace SudokuSolver.Solver.Rule
{
	public class IntersectionProcessor : ISudokuProcessor
	{
		uint valToProcess = 0;
		Board board = null;
		public IntersectionProcessor(uint val, Board b)
		{
			this.valToProcess = val;
			this.board = b;
		}
		public bool process(IBoardPortion p, Dictionary<Cell, Cell> processedInvalidCells)
		{
			uint currentCount = this.board.getValueCountInBoard(this.valToProcess);
			if (this.board.maxN == currentCount)
				return false;

			
			Cell cellToAssign = null;

			if (p.getNumberPresence(valToProcess) == false)
			{
				var allFreeCells = p.getAllFreeCells();
				for (int idx = 0; idx < allFreeCells.Count; ++idx)
				{
					var c = allFreeCells[idx];
					if (processedInvalidCells.ContainsKey(c) == false)
					{
						if (c.partOfRow.getNumberPresence(valToProcess) == false && c.partOfCol.getNumberPresence(valToProcess) == false && c.partOfGrid.getNumberPresence(valToProcess) == false)
						{
							if (cellToAssign == null)
							{
								cellToAssign = c;
							}
							else
							{
								cellToAssign = null;
								break;
							}

						}
						else
						{
							processedInvalidCells[c] = c;
						}
					}
				}

				if (cellToAssign != null)
				{
					cellToAssign.setVal(valToProcess);
					return true;
				}
			}
			return false;
		}
	}
}
