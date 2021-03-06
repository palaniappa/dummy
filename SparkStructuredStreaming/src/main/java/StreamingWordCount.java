import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.streaming.StreamingQuery;
import org.apache.spark.sql.streaming.StreamingQueryException;

import java.util.Arrays;
import java.util.concurrent.TimeoutException;

public class StreamingWordCount {
    public static void main(String[] args) throws StreamingQueryException, TimeoutException {
        System.out.println("Welcome to the streaming word count");

        SparkSession sparkSession = SparkSession.builder()
                .appName("StreamingWordCount")
                .master("local[*]")
                .getOrCreate();

        Dataset<Row> lines = sparkSession
                .readStream()
                .format("socket")
                .option("host","localhost")
                .option("port","9999")
                .load();

        Dataset<String> words = lines
                .as(Encoders.STRING())
                .flatMap((FlatMapFunction<String, String>)
                        x -> Arrays.asList(x.split(" ")).iterator()
                        , Encoders.STRING());

        Dataset<Row> wordCount = words.groupBy("value").count();

        StreamingQuery query = wordCount
                .writeStream()
                .outputMode("complete")
                .format("console")
                .start();

        query.awaitTermination();
    }
}
