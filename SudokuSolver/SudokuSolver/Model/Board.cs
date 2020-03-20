using Sudoku.Model.DTO;
using SudokuSolver.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku.Model
{
    public class Board 
    {
        private uint remainingCount = 0;
        public uint maxN;
        public int maxGridN;
        public Grid[] grids = null;
        public Row[] rows = null;
        public Column[] cols = null;
        public Cell[][] cells = null;
        private Dictionary<uint, uint> valCountInBoard = new Dictionary<uint, uint>();
        public Board(uint n, List<InitialPositionValueDTO> initialItems)
        {
            this.maxN = (uint)n;
            this.remainingCount = n * n;
            this.maxGridN = (int)Math.Sqrt(n);
            cells = new Cell[n][];
            rows = new Row[n];
            cols = new Column[n];
            grids = new Grid[n];
            for (int i = 0; i < n; ++i)
            {
                cells[i] = new Cell[n];
                rows[i] = new Row(i, this);
                cols[i] = new Column(i,this);
                grids[i] = new Grid(i, this.maxGridN, this);
                valCountInBoard[(uint)i + 1] = 0;
            }

            for (int i = 0; i < n; ++i)
            {
                for (int j=0;j<n;++j)
                {
                    var r = rows[i];
                    var c = cols[j];
                    var gIdx = Grid.getGridNumber(i, j, this.maxGridN);
                    var g = grids[gIdx];
                    cells[i][j] = new Cell(i,j,r,c,g, this);
                }
            }

            if (initialItems != null)
            {
                foreach (var ipv in initialItems)
                {
                    cells[ipv.rowNo][ipv.colNo].setVal(ipv.value);
                }
            }
        }

        public void setValue(int i, int j, uint val)
        {
            cells[i][j].setVal(val);
        }

        public void notify(ChangeNotification change, int i, int j, uint val)
        {
            if(change == ChangeNotification.VALUE_SET)
            {
                this.remainingCount--;
                valCountInBoard[val] = valCountInBoard[val]+1;
            }
        }

        public uint getRemainingCount()
        {
            return this.remainingCount;
        }

        public uint getValueCountInBoard(uint val)
        {
            return this.valCountInBoard[val];
        }
        public void printGrid(int gno)
        {
            this.grids[gno].print();
        }

        public void printRow(int no)
        {
            this.rows[no].print();
        }

        public void printCol(int no)
        {
            this.cols[no].print();
        }

        public Board getBoard()
        {
            throw new NotImplementedException();

        }

        public Cell getNextFreeCell()
        {
            throw new NotImplementedException();
        }

        public void print()
        {
            Console.WriteLine("-------------------------------------");
            for (int i = 0; i < maxN; ++i)
            {
                for (int j = 0; j < maxN; ++j)
                {
                    if (j > 0)
                        Console.Write(", ");
                    Console.Write(cells[i][j].val);
                }
                Console.WriteLine("");
            }
            Console.WriteLine("-------------------------------------");
        }
    }
}
