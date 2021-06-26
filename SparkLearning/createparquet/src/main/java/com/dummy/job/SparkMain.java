package com.dummy.job;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class SparkMain {
    public static void main(String[] args) {
        System.out.println("Welcome");

        SparkConf sparkConf = new SparkConf();//getSparkConf();
        sparkConf.setAppName("My First App")
                .setMaster("local[*]");
        SparkSession sparkSession = SparkSession.builder()
                .config(sparkConf)
                //.enableHiveSupport()
                .getOrCreate();

        sparkSession.sparkContext().hadoopConfiguration().set("fs.s3a.access.key", "**");
        sparkSession.sparkContext().hadoopConfiguration().set("fs.s3a.secret.key", "**");
        sparkSession.sparkContext().hadoopConfiguration().set("fs.s3a.endpoint", "s3.amazonaws.com");

        Dataset<Row> dataset = sparkSession.read()
                .format("org.apache.spark.sql.execution.datasources.csv.CSVFileFormat")
                .option("header","true")
                .option("inferSchema","true")
                //.load("s3a://bucketeer-1f9b3403-4543-4851-a978-4c8de7d71129/PalaniTest/Orders/Orders.csv");
                .load("s3a://bucketeer-1f9b3403-4543-4851-a978-4c8de7d71129/PalaniTest/Orders/Individual_Id.csv");


        dataset.printSchema();
        dataset.show(3);

        //String filename = "ssot__Individual1__dlm.parquet";
        String filename = args[0];
        //String filename = "ssot__SalesOrders1__dlm.parquet";
        dataset.write().format("parquet")
                .save("s3a://bucketeer-1f9b3403-4543-4851-a978-4c8de7d71129/PalaniTest/" + filename);

//        String filename = "ssot__SalesOrders__dlm.iceberg";
//        dataset.write().format("iceberg")
//                .save("s3a://bucketeer-1f9b3403-4543-4851-a978-4c8de7d71129/PalaniTest/" + filename);

    }

    private static SparkConf getSparkConf() {
        SparkConf sparkConf = new SparkConf();
        sparkConf.set("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions");
        sparkConf.set("spark.sql.catalog.spark_catalog", "org.apache.iceberg.spark.SparkSessionCatalog");
        sparkConf.set("spark.sql.catalog.spark_catalog.type", "hive");
        sparkConf.set("spark.sql.catalog.local", "org.apache.iceberg.spark.SparkCatalog");
        sparkConf.set("spark.sql.catalog.local.type", "hadoop");
        sparkConf.set("spark.sql.catalog.local.warehouse", "./warehouse");
        return sparkConf;
    }
}
