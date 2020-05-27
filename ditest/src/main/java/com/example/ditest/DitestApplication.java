package com.example.ditest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@SpringBootApplication
public class DitestApplication {

    @Bean
    @Primary
    public INameDecorator getNameDecorator(){
        return new SalutationDecorator();
    }

    public static void main(String[] args) {
        SpringApplication.run(DitestApplication.class, args);
    }

}
