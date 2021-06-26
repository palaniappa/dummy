package com.tutorial.pairrdd;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaSparkContext;
import scala.Tuple2;

import java.util.ArrayList;
import java.util.List;

public class FirstPairRdd {
    public static void main(String[] args) {
        System.out.println("Welcome");

        SparkConf sparkConf = new SparkConf().setAppName("FirstPairRdd").setMaster("local[2]");
        JavaSparkContext sc = new JavaSparkContext(sparkConf);

        List<Tuple2<String,Integer>> ppl = new ArrayList<>();
        ppl.add(new Tuple2<>("Palani", 38));
        ppl.add(new Tuple2<>("Akila", 37));
        ppl.add(new Tuple2<>("Nallu", 12));
        ppl.add(new Tuple2<>("Ramu", 8));

        JavaPairRDD<String,Integer> nameAndAge = sc.parallelizePairs(ppl);

        System.out.println(nameAndAge.count());

        nameAndAge.saveAsTextFile("out/name-and-age.out");
    }
}
