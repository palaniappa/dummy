package com.courseracomp.coursera;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.courseracomp.coursera.course","com.courseracomp.coursera.topic"})
public class CourseraApplication {

	public static void main(String[] args) {
		SpringApplication.run(CourseraApplication.class, args);
	}

}
