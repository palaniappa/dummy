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
using System.Runtime.InteropServices;

class Solution
{
    class Seq
    {
        char c;
        int st;
        int end;
    }

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
    //static void Main(string[] args)
    //{
    //    //TextWriter textWriter = new StreamWriter(@System.Environment.GetEnvironmentVariable("OUTPUT_PATH"), true);
    //    StreamReader sr = new StreamReader(@"C:\Users\pamaniv\source\repos\ConsoleApp4\ConsoleApp4\testcase1.txt");

    //    int q = Convert.ToInt32(sr.ReadLine());

    //    for (int qItr = 0; qItr < q; qItr++)
    //    {
    //        int n = Convert.ToInt32(sr.ReadLine());

    //        int[][] container = new int[n][];

    //        for (int i = 0; i < n; i++)
    //        {
    //            container[i] = Array.ConvertAll(sr.ReadLine().Split(' '), containerTemp => Convert.ToInt32(containerTemp));
    //        }

    //        string result = organizingContainers(container);
    //        Console.WriteLine(result);
    //        //textWriter.WriteLine(result);
    //    }

    //    //textWriter.Flush();
    //    //textWriter.Close();
    //}

    public static void Main(string[] args)
    {
        //int count = getMinDistance("intention", "execution");
        //int count = getMinDistance("horse", "ros");

        //var r = getAllPossibleComposites(new List<int>() { 2, 3, 5 }, 3);

        //var r = getMinDistributionCount(new List<int>() { 2, 2, 3, 7 });
        Dictionary<string, int> preComputed = new Dictionary<string, int>();
        //var r = getMinDistributionCount(new List<int>() { 10, 7, 12 }, preComputed);

        //var r = FirstMissingPositive(new int[] { 3, 4, -1, 1 });
        //var r = getProduct("140", "721");

        //        var median = FindMedianSortedArrays(new int[] {2,4,6,8 }, new int[] { 3,5,7 });
        var median = FindMedianSortedArrays(new int[] { 2, 4, 6, 8 }, new int[] { 3, 5, 7, 9 });
        //var median = FindMedianSortedArrays(new int[] { 0, 2, 4, 16, 18, 20 ,22 }, new int[] { 1, 8, 17, 19, 21, 22, 23 });
        //var median = FindMedianSortedArrays(new int[] { 1, 2 }, new int[] { 3, 4 });
        //var median = FindMedianSortedArrays(new int[] { }, new int[] { 1 });
        //var median = FindMedianSortedArrays(new int[] { 0, 0 }, new int[] { 0,0 });
        //var median = FindMedianSortedArrays(new int[] { 2 }, new int[] {  });
        //var median = FindMedianSortedArrays(new int[] { 1, 2 }, new int[] { -1, 3 });
        //var median = FindMedianSortedArrays(new int[] { 3 }, new int[] { -2, -1 });
        //var median = FindMedianSortedArrays(new int[] { 1,2 }, new int[] { 1, 2, 3 });
    }

    public static double getMedian(IEnumerable<int> items)
    {
        if(items.Count() > 0)
        {
            if (items.Count() % 2 == 1)
            {
                return items.ElementAt((items.Count()/ 2));
            }
            else
            {
                int mid = items.Count() / 2;
                return (double)(items.ElementAt(mid) + items.ElementAt(mid - 1)) / 2;
            }
        }
        return 0;
    }

    public static double FindMedianSortedArrays(int[] nums1, int[] nums2)
    {
        int totalLength = nums1.Length + nums2.Length;
        int st1 = 0;
        int end1 = nums1.Length - 1;
        int st2 = 0;
        int end2 = nums2.Length - 1;

        double result = 0;


        if (nums1.Length == 0 || nums2.Length == 0) // || nums1[nums1.Length - 1] <= nums2[0] || nums2[nums2.Length - 1] <= nums1[0])
        {
            if (nums1.Length == 0)
            {
                result = getMedian(nums2);
            }
            else if (nums2.Length == 0)
            {
                result = getMedian(nums1);
            }
        }
        else if (st1 <= end1 && st2 <= end2)
        {
            while (st1 <= end1 && st2 <= end2)
            {
                int mid1 = (end1 + st1) / 2;
                int mid2 = (end2 + st2) / 2;

                int[] primaryArray = null;
                int[] secondaryArray = null;
                int primaryMid = -1;
                int secondaryMid = -1;
                if(nums1[mid1] > nums2[mid2])
                {
                    primaryArray = nums1;
                    secondaryArray = nums2;
                    primaryMid = mid1;
                    secondaryMid = mid2;
                }
                else
                {
                    primaryArray = nums2;
                    secondaryArray = nums1;
                    primaryMid = mid2;
                    secondaryMid = mid1;
                }
                //Max
                int leftMaxMedianCount = getMinCount(nums1, mid1, primaryArray[primaryMid]) + getMinCount(nums2, mid2, primaryArray[primaryMid]);
                int rightMaxMedianCount = getMaxCount(nums1, mid1, primaryArray[primaryMid]) + getMaxCount(nums2, mid2, primaryArray[primaryMid]);
                var diff = totalLength - leftMaxMedianCount - rightMaxMedianCount ;
                if ( diff == 0){
                    //got the median as max
                    result = primaryArray[primaryMid];
                    break;
                }
                else if(diff == 1)
                {
                    int nextElement = 0;
                    // a + b we should do based on which side is high
                    if(rightMaxMedianCount > leftMaxMedianCount)
                    {
                        if(primaryMid > 0)
                        {
                            nextElement = Math.Max(primaryArray[primaryMid - 1], secondaryArray[secondaryMid]);
                        }
                        else
                        {
                            nextElement = secondaryArray[secondaryMid];
                        }
                        
                    }
                    else
                    {
                        if (primaryMid < primaryArray.Length - 1)
                        {
                            nextElement = Math.Min(primaryArray[primaryMid + 1], secondaryArray[secondaryMid]);
                        }
                        else
                        {
                            nextElement = secondaryArray[secondaryMid];
                        }
                    }
                    result =  (double)(primaryArray[primaryMid] + nextElement) / 2;
                    break;
                }
                else
                {
                    if(nums1[mid1] < nums2[mid2])
                    {
                        st1 = mid1;
                        end2 = mid2; 
                    }
                    else
                    {
                        end1 = mid1;
                        st2 = mid2;
                    }
                }
            }
        }

        return result;
    }

    public static int getMinCount(int[] items, int mid, int maxVal)
    {
        if(items[mid] < maxVal)
        {
            return mid + 1;
        }
        else if(mid > 0 && items[mid-1] < maxVal)
        {
            return mid;
        }
        return 0;
    }

    public static int getMaxCount(int[] items, int mid, int maxVal)
    {
        if (items[mid] > maxVal)
        {
            return items.Length - mid;
        }
        else if (mid+1 < items.Length && items[mid + 1] > maxVal)
        {
            return items.Length - mid - 1;
        }
        return 0;
    }

    //public static double FindMedianSortedArrays(int[] nums1, int[] nums2)
    //{
    //    int totalLength = nums1.Length + nums2.Length;
    //    int st1 = 0;
    //    int end1 = nums1.Length - 1;
    //    int st2 = 0;
    //    int end2 = nums2.Length - 1;

    //    double result = 0;


    //    if (nums1.Length == 0 || nums2.Length == 0 ) // || nums1[nums1.Length - 1] <= nums2[0] || nums2[nums2.Length - 1] <= nums1[0])
    //    {
    //        if (nums1.Length == 0)
    //        {
    //            result = getMedian(nums2);
    //        }
    //        else if (nums2.Length == 0)
    //        {
    //            result = getMedian(nums1);
    //        }
    //        else
    //        {
    //            int[] items = null;
    //            if (nums1[nums1.Length - 1] <= nums2[0])
    //            {
    //                items = nums1.Concat(nums2).ToArray();
    //            }
    //            else
    //            {
    //                items = nums2.Concat(nums1).ToArray();
    //            }
    //            result = getMedian(items);
    //        }
    //    }
    //    else if (st1 <= end1 && st2 <= end2)
    //    {
    //        while (st1 <= end1 && st2 <= end2)
    //        {
    //            int mid1 = (end1 + st1) / 2;
    //            int mid2 = (end2 + st2) / 2;
    //            if (nums1[mid1] == nums2[mid2])
    //            {
    //                result = nums1[mid1];
    //                break;
    //            }
    //            else if ((end1 - st1) == 1 && (end2 - st2) == 1)
    //            {
    //                result = (double)(Math.Max(nums1[st1], nums2[st2]) + Math.Min(nums1[st1 + 1], nums2[st2 + 1])) / 2;
    //                break;

    //            }
    //            else if ((end1 - st1) <= 1 && (end2 - st2) <= 1)
    //            {
    //                List<int> items = new List<int>();
    //                items.Add(nums1[st1]);
    //                items.Add(nums2[st2]);
    //                if (end1 > st1)
    //                {
    //                    items.Add(nums1[st1 + 1]);
    //                }
    //                if (end2 > st2)
    //                {
    //                    items.Add(nums2[st2 + 1]);
    //                }
    //                items.Sort();
    //                result = getMedian(items);
    //                break;
    //            }
    //            else
    //            {

    //                if(nums1[mid1] > nums2[mid2])
    //                {
    //                    end1 = mid1;
    //                    st2 = mid2;
    //                }
    //                else if(nums1[mid1] < nums2[mid2])
    //                {
    //                    st1 = mid1;
    //                    end2 = mid2;
    //                }
    //            }
    //        }
    //    }

    //            return result;
    //}

    public  static string getProduct(string no1, string no2)
    {
        int maxLength = no1.Length + no2.Length;

        
        List<string> items = new List<string>();
        int prodMaxLength = 0;
        int currentRemainder = 0;
        for (int i=no2.Length-1; i >= 0; --i)
        {
            int n1 = getDigit(no2[i]);
            currentRemainder = 0;
            StringBuilder currentItem = new StringBuilder(maxLength);
            bool hasNonZeroValue = false;
            for (int z=i;z< no2.Length-1; ++z)
            {
                currentItem.Append("0");
            }
            for(int j=no1.Length-1;j>=0;--j)
            {
                int n2 = getDigit(no1[j]);
                int p = (n1 * n2) + currentRemainder;
                if(p > 0)
                {
                    hasNonZeroValue = true;
                }
                currentItem.Append((p % 10).ToString());
                currentRemainder = (p / 10);
            }
            if(currentRemainder > 0)
            {
                currentItem.Append(currentRemainder.ToString());
            }
            if (hasNonZeroValue)
            {
                var cp = currentItem.ToString();
                items.Add(cp);
                if (cp.Length > prodMaxLength)
                {
                    prodMaxLength = cp.Length;
                }
            }
                
        }

        if(items.Count > 0)
        {
            StringBuilder result = new StringBuilder(prodMaxLength + 1);
            int idx = 0;
            currentRemainder = 0;
            while (idx < prodMaxLength)
            {
                int sum = currentRemainder;
                items.ForEach(cp =>
                {
                    if (idx < cp.Length)
                    {
                        int n = getDigit(cp[idx]);
                        sum += n;
                    }
                });
                result.Insert(0, (sum % 10).ToString());
                currentRemainder = sum / 10;
                idx++;
            }
            if(currentRemainder > 0)
            {
                result.Insert(0, currentRemainder.ToString());
            }
            return result.ToString();
        }
        return "0";
    }

    public static int getDigit(char c)
    {
        return c - 48;
    }

    public static int FirstMissingPositive(int[] nums)
    {

        HashSet<int> futureItems = new HashSet<int>();
        var number = 1;
        for (int i = 0; i < nums.Length; ++i)
        {
            if (nums[i] == number)
            {
                number++;
                while (futureItems.Contains(number))
                {
                    futureItems.Remove(number);
                    number++;
                }
            }
            else if (nums[i] > number)
            {
                futureItems.Add(nums[i]);
            }
        }
        return number;
    }

    public static int getMinDistributionCount(List<int> nos, Dictionary<string,int> preComputed)
    {
        int maxIdx = 0;
        int max = nos[0];
        bool allAreSame = true;
        for(int i = 1; i < nos.Count; ++i)
        {
            if(nos[i] > max)
            {
                max = nos[i];
                maxIdx = i;
            }

            if(nos[i] != nos[i - 1])
            {
                allAreSame = false;
            }
            //check reaching -ve....
        }

        if (allAreSame)
            return 0;

        var newList = new List<int>(nos);
        newList.Sort();
        string key = "";
        newList.ForEach(n =>
       {
           if (key.Length > 0)
               key = key + "_";
           key = key + n;  
       });

        if (preComputed.ContainsKey(key))
        {
            return preComputed[key];
        }

        List<int> options = new List<int>() { 1, 2, 5 };
        int minCount = -1;
        options.ForEach(o =>
       {
           List<int> newItems = new List<int>(nos);
           if(newItems[maxIdx] >= o)
           {
               newItems[maxIdx] -= o;
               int thisCount = getMinDistributionCount(newItems, preComputed);
               if(thisCount != -1 && thisCount < minCount || minCount == -1)
               {
                   minCount = thisCount;
               }
           }
       });

        preComputed[key] = minCount + 1;
        return minCount + 1;
    }

    public static List<int> getAllPossibleComposites(List<int> inputNumbers, int idx)
    {
        if (idx == 0)
            return null;
        int currentNumber = inputNumbers[idx - 1];
        var result = getAllPossibleComposites(inputNumbers, idx - 1);
        var newItems = new List<int>();
        newItems.Add(currentNumber);
        if(result != null)
        {
            result.ForEach(n =>
           {
               newItems.Add(n * currentNumber);
           });

            newItems.AddRange(result);
        }
        return newItems;
    } 

    public static int getMinDistance(string source, string dest)
    {
        Dictionary<string, int> preComputed = new Dictionary<string, int>();
        return getMinDistanceImpl(source, dest, 0, 0, preComputed);
    }

    public static int getMinDistanceImpl(string source, string dest, int i, int j, Dictionary<string, int> preComputed)
    {
        
        if(i == source.Length)
        {
            return dest.Length - j;
        }

        if( j == dest.Length )
        {
            return source.Length - i;
        }

        string key = i.ToString() + "_" + j.ToString();
        if (preComputed.ContainsKey(key))
        {
            return preComputed[key];
        }

        int count = 0;
        if(source[i] == dest[j])
        {
            count = getMinDistanceImpl(source, dest, i + 1, j + 1, preComputed);
        }
        else
        {
            count = 1 + Math.Min(Math.Min(
                    getMinDistanceImpl(source, dest, i + 1, j, preComputed)
                    , getMinDistanceImpl(source, dest, i, j + 1, preComputed))
                    , getMinDistanceImpl(source, dest, i + 1, j + 1, preComputed)
                );
        }

        preComputed[key] = count;
        return count;
    }
}
