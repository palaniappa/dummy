package com.data.playground.services;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.catalog.CatalogConnectorProperty;
import com.data.playground.model.data.dto.UserCatalogType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CatalogService {

    private static final String CATALOG_TYPE_HIVE = "HIVE";

    public UserCatalogType getUserCatalogType(String catalogType) throws PlaygroundException {
        if(catalogType.equals(CATALOG_TYPE_HIVE)) {
            return  UserCatalogType.S3;
        }
        throw new PlaygroundException("Unknown catalog type");
    }

    public String getCatalogType(UserCatalogType catalogType) throws PlaygroundException {
        if(catalogType == UserCatalogType.S3) {
            return  CATALOG_TYPE_HIVE;
        }
        throw new PlaygroundException("Unknown catalog type");
    }

    public String getConnectorIdForCatalogType(String catalogType) throws PlaygroundException {
        if(catalogType.equals(CATALOG_TYPE_HIVE)) {
            return  "hive-hadoop2";
        }
        throw new PlaygroundException("Unknown catalog type");
    }

    private List<CatalogConnectorProperty> getDefaultCatalogConnectorPropertyTypes(String catalogType) throws PlaygroundException {
        List<CatalogConnectorProperty> properties = new ArrayList<>();
        if(catalogType.equals(CATALOG_TYPE_HIVE)) {
            properties.add(new CatalogConnectorProperty("hive.s3.aws-access-key","AWS Access Key",true));
            properties.add(new CatalogConnectorProperty("hive.s3.aws-secret-key","AWS Secret Key",true));
            properties.add(new CatalogConnectorProperty("hive.s3.endpoint","S3 Endpoint",false));
            return properties;
        }
        throw new PlaygroundException("Unknown catalog type");
    }

    public Map<String,String> getUserCatalogProperties(String catalogType, Map<String,String> dbCatalogProperties) throws PlaygroundException {
        List<CatalogConnectorProperty> defaultProperties = this.getDefaultCatalogConnectorPropertyTypes(catalogType);
        Map<String,String> userProps = new HashMap<>();
        for(CatalogConnectorProperty prop : defaultProperties) {
            userProps.put(prop.getDisplayName(),dbCatalogProperties.get(prop.getName()));
        }
        return userProps;
    }

    public Map<String,String> getStoreCatalogProperties(String catalogType, Map<String,String> dbCatalogProperties) throws PlaygroundException {
        List<CatalogConnectorProperty> defaultProperties = this.getDefaultCatalogConnectorPropertyTypes(catalogType);
        Map<String,String> userProps = new HashMap<>();
        for(CatalogConnectorProperty prop : defaultProperties) {
            userProps.put(prop.getName(),dbCatalogProperties.get(prop.getDisplayName()));
        }
        return userProps;
    }
}
