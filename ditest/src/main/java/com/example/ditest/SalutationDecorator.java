package com.example.ditest;

import org.springframework.stereotype.Component;

@Component
public class SalutationDecorator implements  INameDecorator {

    @Override
    public String decorate(String name) {
        return "Mr/Ms/Mrs " + name;
    }
}
