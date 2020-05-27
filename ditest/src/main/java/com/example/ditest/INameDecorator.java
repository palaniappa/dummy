package com.example.ditest;

import org.springframework.stereotype.Component;

@Component
public interface INameDecorator {

    public String decorate(String name);
}
