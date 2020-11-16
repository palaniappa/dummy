package com.data.playground.model.data.dto;

public class CatalogTablesDTO {
    public String databaseId;
    public String tableId;
    public String tableName;

    public CatalogTablesDTO() {
    }

    public CatalogTablesDTO(String databaseId, String tableId, String tableName) {
        this.databaseId = databaseId;
        this.tableId = tableId;
        this.tableName = tableName;
    }

    public String getDatabaseId() {
        return databaseId;
    }

    public void setDatabaseId(String databaseId) {
        this.databaseId = databaseId;
    }

    public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
