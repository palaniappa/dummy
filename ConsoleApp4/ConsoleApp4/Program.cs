using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;

class Solution
{

    static int getNextTypeForContainer(int[] containerTypes, int cIdx)
    {
        return containerTypes[cIdx]++;
    }
    // Complete the organizingContainers function below.
    static string organizingContainers(int[][] container)
    {
        int[] containerTypes = new int[container.Length];
        for(int i=0;i<container.Length;++i)
        {
            containerTypes[i] = -1;
        }
        bool possible = false;
        for (int cIdx = 0; cIdx < container.Length;)
        {
            containerTypes[cIdx] += 1;
            int typeId = containerTypes[cIdx];
            if(typeId == container.Length)
            {
                containerTypes[cIdx] = -1;
                cIdx--;
                if (cIdx == -1)
                    break;
                continue;
            }
            //type idx find column sum and row sum excluding idx
            long takeSum = 0;
            long giveSum = 0;
            for (int i = 0; i < container.Length; ++i)
            {
                if (i != typeId)
                {
                    giveSum += container[cIdx][i];
                }
                if (i != cIdx)
                {
                    takeSum += container[i][typeId];
                }
            }

            if (takeSum == giveSum)
            {
                cIdx++;
                if (cIdx == container.Length)
                {
                    possible = true;
                    break;
                }
            }
        }
        return possible ? "Possible" : "Impossible";
    }
    //
    static void Main(string[] args)
    {
        //TextWriter textWriter = new StreamWriter(@System.Environment.GetEnvironmentVariable("OUTPUT_PATH"), true);
        StreamReader sr = new StreamReader(@"C:\Users\pamaniv\source\repos\ConsoleApp4\ConsoleApp4\testcase1.txt");

        int q = Convert.ToInt32(sr.ReadLine());

        for (int qItr = 0; qItr < q; qItr++)
        {
            int n = Convert.ToInt32(sr.ReadLine());

            int[][] container = new int[n][];

            for (int i = 0; i < n; i++)
            {
                container[i] = Array.ConvertAll(sr.ReadLine().Split(' '), containerTemp => Convert.ToInt32(containerTemp));
            }

            string result = organizingContainers(container);
            Console.WriteLine(result);
            //textWriter.WriteLine(result);
        }

        //textWriter.Flush();
        //textWriter.Close();
    }
}
