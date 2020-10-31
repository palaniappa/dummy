package com.smarttoolsprod;

<<<<<<< HEAD
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;

public class Reduce extends Reducer<Text, IntWritable, Text, LongWritable> {

    @Override
    protected void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
        long count = 0;
        for(IntWritable value : values){
            count = count + value.get();
        }
        context.write(key,new LongWritable(count));
        System.out.println("Writing key " + key + " value " + count);

    }
=======
public class Reduce {
>>>>>>> bbdee76d6536d131900de883255b65f486e43c10
}
