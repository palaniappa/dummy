package com.data.playground.model;

import java.util.HashMap;
import java.util.Map;

public class ResultRecord {

    private Map<String,Object> properties = new HashMap<>();
    public Map<String,Object> getProperties() {
        return  this.properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }
}
