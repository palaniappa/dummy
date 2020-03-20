using Sudoku.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SudokuSolver.Model
{
	public enum ChangeNotification
	{
		VALUE_SET
	}

	public interface IBoardPortion
	{
		bool getNumberPresence(uint n);
		uint getRemainingCount();
		uint getNextMissingNumber();
		void notify(ChangeNotification change, int i, int j, uint val);

		Board getBoard();
		Cell getNextFreeCell();
		List<Cell> getAllFreeCells();
	}

	
}
