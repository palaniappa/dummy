package com.smarttoolsprod;

<<<<<<< HEAD
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

public class Map extends Mapper<LongWritable, Text, Text, IntWritable> {

    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        System.out.println("Job started");
        String line = value.toString();
        String[] words = line.split(" ");
        for(String word : words){
            context.write(new Text(word),new IntWritable(1));
        }
    }
=======
public class Map {
>>>>>>> bbdee76d6536d131900de883255b65f486e43c10
}
