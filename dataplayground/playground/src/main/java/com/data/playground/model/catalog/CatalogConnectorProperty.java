package com.data.playground.model.catalog;

public class CatalogConnectorProperty {

    private String name;
    private String displayName;
    private boolean isKey;

    public CatalogConnectorProperty() {
    }

    public CatalogConnectorProperty(String name, String displayName, boolean isKey) {
        this.name = name;
        this.displayName = displayName;
        this.isKey = isKey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public boolean isKey() {
        return isKey;
    }

    public void setKey(boolean key) {
        isKey = key;
    }
}
