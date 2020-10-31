package com.data.playground.model;

import com.data.playground.model.datamodel.TableField;

import java.util.List;

public class CreateTableRequest {
    private String tableName;
    private List<TableField> fields;
    private String locationPath;

    public String getLocationPath() {
        return locationPath;
    }

    public void setLocationPath(String locationPath) {
        this.locationPath = locationPath;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public List<TableField> getFields() {
        return fields;
    }

    public void setFields(List<TableField> fields) {
        this.fields = fields;
    }
}
