using Sudoku.Model;
using Sudoku.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sudoku.Solver;

namespace SudokuSolverConsoleTest
{
	class Program
	{
		static List<InitialPositionValueDTO> getBasicTestCase1()
		{
			var initialItems = new List<InitialPositionValueDTO>();
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 0, colNo = 0, value = 3 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 0, colNo = 1, value = 4 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 0, colNo = 2, value = 1 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 1, colNo = 1, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 2, colNo = 2, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 1, value = 1 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 2, value = 4 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 3, value = 3 });
			return initialItems;
		}

		static List<InitialPositionValueDTO> getTestCase2()
		{
			var initialItems = new List<InitialPositionValueDTO>();
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 0, colNo = 0, value = 4 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 1, colNo = 1, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 1, colNo = 3, value = 4 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 2, colNo = 0, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 2, colNo = 2, value = 3 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 3, value = 2 });
			return initialItems;
		}

		static List<InitialPositionValueDTO> get9b9TestCase1()
		{
			var initialItems = new List<InitialPositionValueDTO>();
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 0, colNo = 0, value = 5 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 0, colNo = 4, value = 1 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 0, colNo = 8, value = 4 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 1, colNo = 0, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 1, colNo = 1, value = 7 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 1, colNo = 2, value = 4 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 1, colNo = 6, value = 6 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 2, colNo = 1, value = 8 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 2, colNo = 3, value = 9 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 2, colNo = 5, value = 4 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 0, value = 8 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 1, value = 1 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 3, value = 4 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 4, value = 6 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 6, value = 3 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 3, colNo = 8, value = 2 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 4, colNo = 2, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 4, colNo = 4, value = 3 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 4, colNo = 6, value = 1 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 5, colNo = 0, value = 7 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 5, colNo = 2, value = 6 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 5, colNo = 4, value = 9 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 5, colNo = 5, value = 1 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 5, colNo = 7, value = 5 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 5, colNo = 8, value = 8 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 6, colNo = 3, value = 5 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 6, colNo = 5, value = 3 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 6, colNo = 7, value = 1 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 7, colNo = 2, value = 5 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 7, colNo = 6, value = 9 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 7, colNo = 7, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 7, colNo = 8, value = 7 });

			initialItems.Add(new InitialPositionValueDTO() { rowNo = 8, colNo = 0, value = 1 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 8, colNo = 4, value = 2 });
			initialItems.Add(new InitialPositionValueDTO() { rowNo = 8, colNo = 8, value = 3 });
			return initialItems;
		}
		static void Main(string[] args)
		{
			var it = get9b9TestCase1();
			Board board = new Board(9, it);
			board.print();

			var solver = new BasicSudokuSolver();
			solver.solveBoard(board);

			Console.WriteLine("\n\nSolved Board:");
			board.print();

			//for (int i=0;i<4;++i)
			//{
			//	board.printGrid(i);
			//	board.printRow(i);
			//	board.printCol(i);
			//}
				
			Console.ReadLine();
		}
	}
}
