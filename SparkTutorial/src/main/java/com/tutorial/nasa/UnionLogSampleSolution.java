package com.tutorial.nasa;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

public class UnionLogSampleSolution {
    public static void main(String[] args) {
        System.out.println("Welcome!");

        SparkConf conf = new SparkConf().setAppName("UnionSampleLogSolution").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(conf);
        JavaRDD<String> julyLogs = sc.textFile("in/nasa_19950701.tsv");
        JavaRDD<String> augLogs = sc.textFile("in/nasa_19950801.tsv");

        JavaRDD<String> allLogs = julyLogs.union(augLogs);
        JavaRDD<String> sampleLogs = allLogs.sample(true,0.1);
        JavaRDD<String> sampleLogsWithoutHeader = sampleLogs.filter( line -> {
            return isNotHeader(line);
        });

        JavaRDD<String> sampleLogsInCsv = sampleLogsWithoutHeader.map( l -> {
           return l.replaceAll("\t",",");
        });
        sampleLogsInCsv.saveAsTextFile("out/nasalogs.csv");
    }

    private static boolean isNotHeader(String line) {
        return !line.startsWith("host");
    }
}
