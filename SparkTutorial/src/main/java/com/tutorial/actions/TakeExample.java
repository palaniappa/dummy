package com.tutorial.actions;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

import java.util.Arrays;
import java.util.List;

public class TakeExample {
    public static void main(String[] args) {
        System.out.println("Welcome");
        SparkConf sparkConf = new SparkConf().setAppName("TakeExample").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(sparkConf);
        JavaRDD<String> lines = sc.textFile("in/word_count.text");
        JavaRDD<String> words =  lines.flatMap( l -> {
            return Arrays.stream(l.split(" ")).filter( s -> !s.isEmpty()).iterator();
        });

        List<String> takenWords = words.take(10);
        System.out.println(takenWords);



    }
}
