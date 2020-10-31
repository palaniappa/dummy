package com.smarttoolsprod;

import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;

public class Main extends Configured implements Tool {

    @Override
    public int run(String[] args) throws Exception {
        System.out.println("Started");
        JobConf jobConf = new JobConf(getConf());
        Job job = Job.getInstance(jobConf);
        job.setJobName("wordcount");
        job.setJarByClass(Main.class);

        job.setMapOutputValueClass(IntWritable.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(LongWritable.class);

        job.setMapperClass(Map.class);
        job.setReducerClass(Reduce.class);

        Path inputFilePath = new Path(args[0]);
        Path outputFilePath = new Path(args[1]);

        System.out.println("Inputpath " + inputFilePath.toString());
        System.out.println("Outputpath " + outputFilePath.toString());

        FileInputFormat.addInputPath(job, inputFilePath);
        FileOutputFormat.setOutputPath(job, outputFilePath);

        System.out.println("About to wiat for complettion");
        return job.waitForCompletion(true) ? 0 : 1;
    }

    public static void main(String[] args) {
	// write your code here
        System.out.println("Hello!");

        try{
            int exitCode = ToolRunner.run(new Main(), args);
            System.out.println("Completed with code " + exitCode);
            System.exit(exitCode);
        }catch (Exception e){
            System.out.println(e.toString());
        }

    }
}
