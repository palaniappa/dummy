package com.tutorial.pairrdd;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function2;
import scala.Tuple2;

import java.util.Arrays;
import java.util.Iterator;
import java.util.Locale;

public class WordCountWithPairRddAndReduceByKey {

    static class WordSplitter implements FlatMapFunction<String,String> {

        @Override
        public Iterator<String> call(String s) throws Exception {
            return Arrays.stream(s.split(" ")).iterator();
        }
    }

    public static void main(String[] args) {
        System.out.println("Welcome to my first own spark job");
        SparkConf sparkConf = new SparkConf().setAppName("Word count").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(sparkConf);

        JavaRDD<String> lines = sc.textFile("in/*.*");
        JavaRDD<String> words = lines.flatMap(new WordSplitter());
        JavaRDD<String> enrichedWords = words.map( w -> w.toLowerCase(Locale.ROOT).replaceAll("\"","").replaceAll(",",""));
        JavaRDD<String> filteredWords = enrichedWords.filter( w -> !w.isEmpty());
        JavaPairRDD<String,Integer> wordCounts =  filteredWords.mapToPair(w -> new Tuple2<>(w,1));
        JavaPairRDD<String,Integer> reducedCounts = wordCounts.reduceByKey( (Function2<Integer, Integer, Integer>) (x,y) -> x+y);

        reducedCounts = reducedCounts.filter( t -> t._2 > 5);

        reducedCounts.saveAsTextFile("out/words.txt");
    }
}
