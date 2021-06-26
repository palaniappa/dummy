package com.tutorial.pairrdd;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import java.util.Locale;

public class AirportsInUS {

    static class AirportAndCountryGenerator implements PairFunction<String, String,String> {

        @Override
        public Tuple2<String, String> call(String s) throws Exception {
            String[] tokens = s.split(",");
            if(tokens.length > 3) {
                String airportName = tokens[1].replaceAll("\"","");
                String countryName = tokens[3].replaceAll("\"","");;
                return new Tuple2<>(airportName,countryName);
            }
            return new Tuple2<>("Unknown","Unknown");

        }
    }

    static class AirportFilters implements Function<Tuple2<String,String>, Boolean> {

        @Override
        public Boolean call(Tuple2<String, String> airport) throws Exception {
            return  airport._2.toLowerCase(Locale.ROOT).equals("united states");
        }
    }

    public static void main(String[] args) {
        System.out.println("Welcome to pair to RDD");

        SparkConf sparkConf = new SparkConf().setAppName("Airports in US").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(sparkConf);
        JavaRDD<String> airportsRdd = sc.textFile("in/airports.text");

        JavaPairRDD<String,String> airportsWithCountryName = airportsRdd.mapToPair(new AirportAndCountryGenerator());

        JavaPairRDD<String,String> usAirports = airportsWithCountryName.filter( new AirportFilters());
        usAirports.saveAsTextFile("out/us-airports.text");
//        airportsWithCountryName.filter( a -> {
//            return a._2.toLowerCase(Locale.ROOT).equals("united states");
//        });
    }
}
