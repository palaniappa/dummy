package com.tutorial;

import org.apache.commons.lang3.StringUtils;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

public class AiportsByLatitude {
    public static final String COMMA_DELIMITER = ",(?=([^\"]*\"[^\"]*\")*[^\"]*$)";
    public static void main(String[] args) {
        SparkConf conf = new SparkConf();
        conf.setAppName("AirportsByLatitude");
        conf.setMaster("local[*]");

        JavaSparkContext javaSparkContext = new JavaSparkContext(conf);

        JavaRDD<String> airports = javaSparkContext.textFile("in/airports.text");
        JavaRDD<String> airportsWithLatitudeFilter = airports.filter( l -> {
           String[] splits = l.split(COMMA_DELIMITER);
           double latitude = Double.parseDouble(splits[6]);
           if (latitude > 40)
               return true;
           return  false;
        });

        JavaRDD<String> airportNameAndLatitude = airportsWithLatitudeFilter.map( l -> {
            String[] splits = l.split(COMMA_DELIMITER);
            return StringUtils.join(new String[] { splits[1], splits[6]}, ",");
        });

        airportNameAndLatitude.saveAsTextFile("out/aiports_with_latitude.text");
    }
}
