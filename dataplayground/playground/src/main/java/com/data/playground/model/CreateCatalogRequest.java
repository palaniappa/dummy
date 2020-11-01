package com.data.playground.model;

import com.data.playground.model.datamodel.TableField;

import java.util.List;

public class CreateCatalogRequest {
    private String catalogName;
    private String accessKey;
    private String secretKey;

    public String getCatalogName() {
        return catalogName;
    }

    public void setCatalogName(String catalogName) {
        this.catalogName = catalogName;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }
}
