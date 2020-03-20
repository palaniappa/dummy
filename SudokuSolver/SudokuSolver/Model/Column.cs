using SudokuSolver.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku.Model
{
	public class Column : BoardPortion, IBoardPortion
	{
        public int colNo { get; set; } = -1;
		public Dictionary<int, Cell> cells = new Dictionary<int, Cell>();

		public Column(int no, Board board)
            : base(board)
		{
			this.colNo = no;
		}

        public Cell getNextFreeCell()
        {
			for (int i = 0; i < base.getBoard().maxN; ++i)
			{
				if (this.cells[i].hasValue == false)
					return this.cells[i];
			}
			return null;
		}

		public List<Cell> getAllFreeCells()
		{
			var allFreeCells = new List<Cell>();
			for (int i = 0; i < base.getBoard().maxN; ++i)
			{
				if (this.cells[i].hasValue == false)
				{
					allFreeCells.Add(this.cells[i]);
				}
			}
			return allFreeCells;
		}

		public void print()
		{
			Console.WriteLine($"\nCol no {this.colNo}");
			foreach (var item in cells)
			{
				Console.Write($"{item.Value.val}, ");
			}
		}
	}
}
