package com.tutorial.pairrdd;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.Function2;
import scala.Tuple2;

import java.util.Map;

public class AvgHousePriceByBedroom {

    public static void main(String[] args) {
        SparkConf sparkConf = new SparkConf().setAppName("Avg House Price").setMaster("local[*]");
        JavaSparkContext sc = new JavaSparkContext(sparkConf);

        JavaRDD<String> houseDetails = sc.textFile("in/RealEstate.csv");
        JavaPairRDD<Integer,AvgCount> bedroomVsPrices = houseDetails.mapToPair(s -> {
            String[] tokens = s.split(",");
            Integer bedrooms = 0;
            Double price = 0.0;
            if(tokens.length  == 8) {
                try
                {
                    bedrooms = Integer.parseInt(tokens[3]);
                    price = Double.parseDouble(tokens[2]);
                }
                catch (Exception e) {
                    //ignore
                    bedrooms = 0;
                    price = 0.0;
                }
            }
            return new Tuple2<>(bedrooms, new AvgCount(1,price));
        });

        JavaPairRDD<Integer,AvgCount> roomsVsPrice =  bedroomVsPrices.reduceByKey( (Function2<AvgCount, AvgCount, AvgCount>) (p1,p2) -> {
            return  new AvgCount(p1.getCount() + p2.getCount(), p1.getPrice() + p2.getPrice());
        });

        JavaPairRDD<Integer,Double> priceDetails =  roomsVsPrice.mapValues((Function<AvgCount, Double>) a -> a.getPrice()/a.getCount() );

        Map<Integer,Double> pries = priceDetails.collectAsMap();
        System.out.println(pries);
    }
}
