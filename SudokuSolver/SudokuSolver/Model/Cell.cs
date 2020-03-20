using SudokuSolver.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku.Model
{
	public class Cell
	{
		public int row { get; set; } = -1;
		public int col { get; set; } = -1;
		private uint m_val { get; set; } = 0;

		public Column partOfCol { get; set; }
		public Row partOfRow { get; set; }

		public Grid partOfGrid { get; set; }

		public Board partOfBoard { get; set; }


		public Cell(int i, int j, Row row, Column col, Grid grid, Board board)
		{
			this.row = i;
			this.col = j;
			this.partOfCol = col;
			this.partOfRow = row;
			this.partOfGrid = grid;
			this.partOfBoard = board;
			this.partOfRow.cells[j] = this;
			this.partOfCol.cells[i] = this;
			this.partOfGrid.addCell(i, j, this);
		}

		public void setVal(uint val)
		{
			this.m_val = val;
			this.partOfRow.notify(ChangeNotification.VALUE_SET, this.row, this.col, val);
			this.partOfCol.notify(ChangeNotification.VALUE_SET, this.row, this.col, val);
			this.partOfGrid.notify(ChangeNotification.VALUE_SET, this.row, this.col, val);
			this.partOfBoard.notify(ChangeNotification.VALUE_SET, this.row, this.col, val);
			Console.WriteLine($"Set {this.row}, {this.col} => {this.val}");
			Console.ReadKey();
		}

		public uint val
		{
			get
			{
				return this.m_val;
			}
		}

		public bool hasValue
		{
			get { return this.m_val != 0; }
		}
	}
}
