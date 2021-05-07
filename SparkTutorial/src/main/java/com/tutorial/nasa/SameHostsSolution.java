package com.tutorial.nasa;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

public class SameHostsSolution {

    public static void main(String[] args) {
        System.out.println("Welcome");

        SparkConf conf = new SparkConf().setAppName("SameHosts").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(conf);

        JavaRDD<String> julyLogs = sc.textFile("in/nasa_19950701.tsv");
        JavaRDD<String> augLogs = sc.textFile("in/nasa_19950801.tsv");

        JavaRDD<String> julyHosts = distinct(excludeHeader(retrieveOnlyHosts(julyLogs)));
        JavaRDD<String> augHosts = distinct(excludeHeader(retrieveOnlyHosts(augLogs)));

        JavaRDD<String> commonHosts = julyHosts.intersection(augHosts);
        commonHosts.saveAsTextFile("out/nasa_same_hosts");

    }

    private static JavaRDD<String> retrieveOnlyHosts(JavaRDD<String> input) {
        JavaRDD<String> onlyHosts = input.map( l -> {
            String[] tokens = l.split("\t");
            return tokens[0];
        });
        return onlyHosts;
    }

    private static JavaRDD<String> excludeHeader(JavaRDD<String> input) {
        JavaRDD<String> nonHeaderLines = input.filter( l -> {
           return isNotHeader(l);
        });
        return nonHeaderLines;
    }

    private static JavaRDD<String> distinct(JavaRDD<String> input) {
        return input.distinct();
    }
    private static boolean isNotHeader(String line) {
        return !line.startsWith("host");
    }
}
