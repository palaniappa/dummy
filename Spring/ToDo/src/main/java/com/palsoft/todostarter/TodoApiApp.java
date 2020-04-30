package com.palsoft.todostarter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.palsoft.todostarter", "com.palsoft.topicsection"})
public class TodoApiApp {

	public static void main(String[] args) {
		
		SpringApplication.run(TodoApiApp.class, args);
	}

}
