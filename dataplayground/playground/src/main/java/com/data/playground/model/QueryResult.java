package com.data.playground.model;

import java.util.ArrayList;
import java.util.List;

public class QueryResult {
    private List<ResultRecord> records = new ArrayList<>();

    public List<ResultRecord> getRecords() {
        return records;
    }

    public void setRecords(List<ResultRecord> records) {
        this.records = records;
    }
}
