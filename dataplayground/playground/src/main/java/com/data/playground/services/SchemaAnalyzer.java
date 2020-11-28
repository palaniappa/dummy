package com.data.playground.services;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.SchemaRequest;
import com.data.playground.model.data.dto.TableSchema;
import com.data.playground.repositories.entity.Catalog;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import java.lang.reflect.Type;
import java.util.Map;

public abstract class SchemaAnalyzer {
    protected Catalog catalog;
    protected SchemaRequest schemaRequest;
    protected Map<String,String> catalogConnectProperties;
    public SchemaAnalyzer(Catalog catalog, SchemaRequest schemaRequest) {
        this.catalog = catalog;
        this.schemaRequest = schemaRequest;
        Gson gson = new Gson();
        Type type = new TypeToken<Map<String, String>>() {
        }.getType();
        this.catalogConnectProperties = gson.fromJson(catalog.getProperties(), type);


    }

    public abstract TableSchema getSchema() throws PlaygroundException;
}
