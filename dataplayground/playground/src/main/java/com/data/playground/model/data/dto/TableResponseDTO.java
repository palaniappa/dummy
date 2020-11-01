package com.data.playground.model.data.dto;

import org.apache.hadoop.hive.metastore.api.Table;

public class TableResponseDTO {
    private Table createdTable;

    public Table getCreatedTable() {
        return createdTable;
    }

    public void setCreatedTable(Table createdTable) {
        this.createdTable = createdTable;
    }
}
