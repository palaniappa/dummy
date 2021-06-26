package com.tutorial;

import org.apache.commons.lang3.StringUtils;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

import java.util.Arrays;
import java.util.Map;

public class WordCount {
    public static void main(String[] args) {
        System.out.println("Welcome");
        SparkConf conf = new SparkConf().setAppName("WordCount").setMaster("local[1]");
        JavaSparkContext sc = new JavaSparkContext(conf);
        JavaRDD<String> lines = sc.textFile("in/word_count.text");
        JavaRDD<String> words = lines.flatMap( l -> {
           return Arrays.asList(l.split(" ")).iterator();
        });

        System.out.println("Total words " + words.count());
        JavaRDD<String> filteredWords = words.filter( w -> {
            return !StringUtils.isBlank(w) && !StringUtils.isEmpty(w);
        });

        System.out.println("Filtered Total words " + filteredWords.count());

        Map<String,Long> wordCount = filteredWords.countByValue();
        for(Map.Entry<String, Long> w : wordCount.entrySet()) {
            System.out.println(w.getKey() + ":" + w.getValue());
        }

    }
}
