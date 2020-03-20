using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sudoku.Model.DTO
{
	public class InitialPositionValueDTO
	{
		public int rowNo { get; set; }
		public int colNo { get; set; }
		public uint value { get; set; }
	}
}
