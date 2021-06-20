package com.tutorial.actions;

import org.apache.commons.lang3.StringUtils;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

import java.util.ArrayList;
import java.util.List;

public class ReduceExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("ReduceExample").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(conf);

        JavaRDD<String> input = sc.textFile("in/prime_nums.text");
        JavaRDD<Integer> numbers =  input.flatMap( l -> {
           String[] splits = l.split("\t");
           List<Integer> nums = new ArrayList<>();
           for(String s : splits) {
               String s1 = s.trim();
               if(!StringUtils.isEmpty(s1))
                   nums.add(Integer.parseInt(s1));
           }
           return  nums.iterator();
        });

        System.out.println(numbers.count());

        Integer sum = numbers.reduce( (x,y) -> x + y);
        System.out.println(sum);
    }
}
