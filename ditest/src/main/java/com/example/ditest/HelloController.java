package com.example.ditest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/hello")
public class HelloController {

    @Autowired
    private INameDecorator decorator;

    public HelloController(INameDecorator decorator)
    {
        this.decorator = decorator;

    }

    @RequestMapping(path="/{name}", method = RequestMethod.GET)
    public String getIndex(@PathVariable String name){
        String decoratedName = decorator.decorate(name);
        return decoratedName;
    }
}
