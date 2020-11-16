package com.data.playground.model.data.dto;

public class CatalogTablesDTO {
    public String tableId;
    public String tableName;

    public CatalogTablesDTO() {
    }

    public CatalogTablesDTO(String tableId, String tableName) {
        this.tableId = tableId;
        this.tableName = tableName;
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
