package com.tutorial.pairrdd;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import java.util.Arrays;
import java.util.List;

public class MapToPairExample {

    public static class MyNameAndAgePairGenerator implements PairFunction<String,String,Integer> {

        @Override
        public Tuple2<String, Integer> call(String s) throws Exception {
            String[] nameAndAge = s.split(" ");
            if(nameAndAge.length < 2) {
                return new Tuple2<>(nameAndAge[0], -1);
            }
            Integer age = -1;
            try {
                age = Integer.parseInt(nameAndAge[1]);
            }
            catch (Exception e) {
                //ignore
            }

            return  new Tuple2<>(nameAndAge[0], age);
        }
    }

    public static void main(String[] args) {
        SparkConf sparkConf = new SparkConf().setAppName("MapToPairExmaple").setMaster("local[2]");
        JavaSparkContext sc = new JavaSparkContext(sparkConf);
        List<String> ppl = Arrays.asList("Palani 38", "Akila 37", "Nallu 12", "Ramu 8","NoAge");
        JavaRDD<String> pplRdd = sc.parallelize(ppl);
        JavaPairRDD<String,Integer> pplAndAge = pplRdd.mapToPair(new MyNameAndAgePairGenerator());
        pplAndAge.saveAsTextFile("out/name-and-age-pair");
    }

}
