package com.data.playground.model;

import java.util.ArrayList;
import java.util.List;

public class QueryResult {
<<<<<<< HEAD

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

=======
    private List<ResultRecord> records = new ArrayList<>();

>>>>>>> bbdee76d6536d131900de883255b65f486e43c10
    public List<ResultRecord> getRecords() {
        return records;
    }

    public void setRecords(List<ResultRecord> records) {
        this.records = records;
    }
}
