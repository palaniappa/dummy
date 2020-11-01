package com.data.playground.model.query.dto;

import java.util.ArrayList;
import java.util.List;

public class QueryResult {

    private int recordCount;
    private boolean done;
    private List<ResultRecord> records = new ArrayList<>();

    public int getRecordCount() {
        return recordCount;
    }

    public void setRecordCount(int recordCount) {
        this.recordCount = recordCount;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public List<ResultRecord> getRecords() {
        return records;
    }

    public void setRecords(List<ResultRecord> records) {
        this.records = records;
    }
}
