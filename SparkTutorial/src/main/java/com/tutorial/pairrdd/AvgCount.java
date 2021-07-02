package com.tutorial.pairrdd;

import scala.Serializable;

public class AvgCount implements Serializable {
    private Integer count;
    private Double price;

    public AvgCount(int count, Double price) {
        this.count = count;
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
