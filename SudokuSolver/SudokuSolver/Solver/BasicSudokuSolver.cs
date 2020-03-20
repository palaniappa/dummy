using Sudoku.Model;
using SudokuSolver.Model;
using SudokuSolver.Solver;
using SudokuSolver.Solver.Rule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku.Solver
{
	public class BasicSudokuSolver
	{
		public void solveBoard(Board b)
		{
			bool newValueSet = false;
			List<IBoardPortion> portions = new List<IBoardPortion>();
			portions.AddRange(b.rows);
			portions.AddRange(b.cols);
			portions.AddRange(b.grids);

			List<ISudokuProcessor> processors = new List<ISudokuProcessor>();
			processors.Add(new LastCellProcessor(b));
			for(uint i = 1; i<b.maxN;++i)
			{
				processors.Add(new IntersectionProcessor(i,b));
			}

			do
			{
				newValueSet = false;
				processors.ForEach((proc) =>
				{
					Dictionary<Cell, Cell> processedInvalidCells = new Dictionary<Cell, Cell>();
					portions.ForEach((p) =>
					{
						if (proc.process(p, processedInvalidCells))
						{
							newValueSet = true;
						}
					});
					b.print();
				});
			} while (newValueSet == true);
		}
	}
}
