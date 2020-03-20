using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sudoku.Model;
using SudokuSolver.Model;

namespace SudokuSolver.Solver
{
	interface ISudokuProcessor
	{
		bool process(IBoardPortion p,Dictionary<Cell,Cell> processedInvalidCells);
	}
}
