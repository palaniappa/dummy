using SudokuSolver.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku.Model
{
	public class Grid : BoardPortion, IBoardPortion
	{
		public int gridSize;
		public int gridNo { get; set; } = -1;
		public Cell[][] cells = null;

		public Grid(int no, int gridSize, Board board)
			: base(board)
		{
			this.gridSize = gridSize;
			this.gridNo = no;
			cells = new Cell[gridSize][];
			for (int i = 0; i < gridSize; ++i)
			{
				cells[i] = new Cell[gridSize];
			}
		}

		public static int getGridNumber(int i,int j, int gridSize)
		{
			int gr = (i / gridSize);
			int gc = (j / gridSize);
			int n = gr * gridSize + gc;
			return n;
		}

		public void addCell(int i, int j, Cell c)
		{
			i = i % this.gridSize;
			j = j % this.gridSize;
			cells[i][j] = c;
		}


		public Cell getNextFreeCell()
		{
			for (int i = 0; i < this.gridSize; ++i)
			{
				for (int j = 0; j < gridSize; ++j)
				{
					if(this.cells[i][j].hasValue == false)
					{
						return this.cells[i][j];
					}
				}
			}
			return null;
		}

		public List<Cell> getAllFreeCells()
		{
			var allFreeCells = new List<Cell>();
			for (int i = 0; i < this.gridSize; ++i)
			{
				for (int j = 0; j < gridSize; ++j)
				{
					if (this.cells[i][j].hasValue == false)
					{
						allFreeCells.Add(this.cells[i][j]);
					}
				}
			}
			return allFreeCells;
		}

		public void print()
		{
			Console.WriteLine($"Printing grid {this.gridNo}");
			for (int i = 0; i < gridSize; ++i)
			{
				for (int j = 0; j < gridSize; ++j)
				{
					if (j > 0)
						Console.Write(", ");
					Console.Write(cells[i][j].val);
				}
				Console.WriteLine();
			}
		}
	}
}
