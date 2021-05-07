package com.tutorial;

import org.apache.commons.lang3.StringUtils;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;

public class Airports {
    public static final String COMMA_DELIMITER = ",(?=([^\"]*\"[^\"]*\")*[^\"]*$)";

    public static void main(String[] args) {
        System.out.println("Welcome!");
        SparkConf sparkConf = new SparkConf();
        sparkConf.setAppName("AirportCoiunt");
        sparkConf.setMaster("local[*]");

        JavaSparkContext javaSparkContext = new JavaSparkContext(sparkConf);
        JavaRDD<String> airports = javaSparkContext.textFile("in/airports.text");
        System.out.println(airports.count());
        JavaRDD<String> usAirports = airports.filter( l -> {
            return l.split(COMMA_DELIMITER)[3].equals("\"United States\"");
        });

        System.out.println(usAirports.count());

        JavaRDD<String> usAirportsWithCityNames = usAirports.map( l -> {
           String[] splits =  l.split(COMMA_DELIMITER);
           return StringUtils.join( new String[] { splits[1], splits[2]},",");
        });

        usAirportsWithCityNames.saveAsTextFile("out/usa_airports.text");
    }
}
