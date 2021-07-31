package com.test;

public class MainTask {
    public static void main(String args[]) {
        System.out.println("Welcome!");
        String className = "org.apache.hadoop.fs.s3a.S3AFileSystem";
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        try {
            Class<?> clazz = Class.forName(className, true, classLoader);
            System.out.println(clazz.getCanonicalName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
