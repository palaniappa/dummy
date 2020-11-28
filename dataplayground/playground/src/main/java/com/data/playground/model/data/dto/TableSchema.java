package com.data.playground.model.data.dto;

import java.util.List;

public class TableSchema {
    private List<TableField> fields;
    private List<String[]> samplesRows;

    public List<TableField> getFields() {
        return fields;
    }

    public void setFields(List<TableField> fields) {
        this.fields = fields;
    }

    public List<String[]> getSamplesRows() {
        return samplesRows;
    }

    public void setSamplesRows(List<String[]> samplesRows) {
        this.samplesRows = samplesRows;
    }
}
