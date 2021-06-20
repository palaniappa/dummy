package com.tutorial.actions;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CollectExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("CollectExample").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(conf);
        List<String> countries = Arrays.asList("India", "US", "UK", "Australia", "Germany", "Singapore", "Malaysia");
        JavaRDD<String> countriesRdd = sc.parallelize(countries);
        List<String> collectedCountries = countriesRdd.collect();
        for(String c : collectedCountries) {
            System.out.println(c);
        }

    }
}
