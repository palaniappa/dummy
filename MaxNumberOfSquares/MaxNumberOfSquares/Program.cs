using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MaxNumberOfSquares
{
	class Point
	{
		public Point(int x, int y)
		{
			this.x = x;
			this.y = y;
		}

		public int x;
		public int y;
		public List<Edge> edges = new List<Edge>();
	}
	class Edge
	{
		public Edge(Point a, Point b)
		{
			this.From = a;
			this.To = b;
		}
		public Point From;
		public Point To;
	};

	class Program
	{
		static void Main(string[] args)
		{
			List<Point> availablePoints = new List<Point>();
			availablePoints.Add(new Point(1, 1));
			availablePoints.Add(new Point(1, 10));
			availablePoints.Add(new Point(10, 1));
			availablePoints.Add(new Point(10, 10));

			availablePoints.Add(new Point(1, 20));
			availablePoints.Add(new Point(20, 1));
			availablePoints.Add(new Point(20, 20));

			availablePoints.Add(new Point(20, 10));
			//availablePoints.Add(new Point(25, 25));

			availablePoints.Add(new Point(10, 20));

			var count = getCount(availablePoints);
			System.Console.WriteLine(count);

			List<Edge> allEdges;
			allEdges = populateEdges(availablePoints);

			List<Dictionary<Point, Point>> possibleSquares = new List<Dictionary<Point, Point>>();
			availablePoints.ForEach((p) =>
			{
				Dictionary<Point, Point> currentSquare = new Dictionary<Point, Point>();
				traverseGraph(p, p, possibleSquares, currentSquare);
			});

			System.Console.WriteLine(possibleSquares.Count);

			foreach (var s in possibleSquares)
			{
				foreach (var p in s.Keys)
				{
					System.Console.Write($" {p.x},{p.y}, ");
				}
				System.Console.WriteLine("");
			}
		}

		private static int getCount(List<Point> points)
		{
			Dictionary<string, int> counts = new Dictionary<string, int>();
			int ansCount = 0;
			foreach (var p1 in points)
			{
				foreach(var p2 in points)
				{
					if(p1 != p2 && p1.x == p2.x && p2.y > p1.y)
					{
						string key = $"Y1:{p1.y}_Y2:{p2.y}";
						if (!counts.ContainsKey(key))
						{
							counts[key] = 0;
						}
						ansCount += counts[key];
						counts[key] += 1;
					}
				}
			}

			return ansCount;
		}

		private static void traverseGraph(Point origin, Point currentPoint, List<Dictionary<Point, Point>> possibleSquare, Dictionary<Point, Point> currentSquare)
		{
			currentSquare[currentPoint] = currentPoint;
			foreach (var e in currentPoint.edges)
			{
				if (e.To == origin && currentSquare.Count == 4)
				{
					if (!alreadyExists(currentSquare, possibleSquare))
					{
						Dictionary<Point, Point> newSquare = new Dictionary<Point, Point>();
						foreach (var s in currentSquare)
						{
							newSquare[s.Key] = s.Value;
						}
						possibleSquare.Add(newSquare);
					}
				}
				else if (currentSquare.ContainsKey(e.To) == false)
				{
					traverseGraph(origin, e.To, possibleSquare, currentSquare);
				}
			}
			currentSquare.Remove(currentPoint);
		}

		private static bool alreadyExists(Dictionary<Point, Point> currentSquare, List<Dictionary<Point, Point>> possibleSquares)
		{
			foreach (var e in possibleSquares)
			{
				var sameSquare = e.Keys.All(k => currentSquare.ContainsKey(k) == true);
				if (sameSquare == true)
					return true;

			}
			return false;
		}

		private static List<Edge> populateEdges(List<Point> allPoints)
		{
			List<Edge> allEdges = new List<Edge>();
			for (int i = 0; i < allPoints.Count; ++i)
			{
				for (int j = 0; i != j && j < allPoints.Count; ++j)
				{
					var a = allPoints[i];
					var b = allPoints[j];
					if ((a.x == b.x || a.y == b.y))// && !a.edges.ContainsKey(b) && !b.edges.ContainsKey(a))
					{
						var aTob = new Edge(a, b);
						var bToa = new Edge(b,a);
						a.edges.Add(aTob);
						b.edges.Add(bToa);
						allEdges.Add(aTob);
						allEdges.Add(bToa);
					}
				}
			}
			return allEdges;
		}
	}
}
