package com.data.playground.model.data.dto;

import java.util.HashMap;
import java.util.Map;

public class Catalog {

    private String id;

    private String name;

    private UserCatalogType catalogType;

    private Map<String,String> properties = new HashMap<>();

    private String databaseName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserCatalogType getCatalogType() {
        return catalogType;
    }

    public void setCatalogType(UserCatalogType catalogType) {
        this.catalogType = catalogType;
    }

    public Map<String, String>  getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }
}
