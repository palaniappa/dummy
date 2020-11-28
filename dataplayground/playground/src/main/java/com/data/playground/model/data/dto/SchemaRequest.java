package com.data.playground.model.data.dto;

public class SchemaRequest {
    private String catalogId;
    private String tableNameOrLocationPath;

    public String getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(String catalogId) {
        this.catalogId = catalogId;
    }

    public String getTableNameOrLocationPath() {
        return tableNameOrLocationPath;
    }

    public void setTableNameOrLocationPath(String tableNameOrLocationPath) {
        this.tableNameOrLocationPath = tableNameOrLocationPath;
    }
}
