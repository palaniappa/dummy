package com.data.playground.services;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.catalog.CatalogConnectorProperty;
import com.data.playground.model.data.dto.UserCatalogType;
import com.data.playground.repositories.CatalogRepository;
import com.data.playground.repositories.entity.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CatalogService {

    @Autowired
    private CatalogRepository catalogRepository;

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
//            if(prop.isKey()) {
//                userProps.put(prop.getDisplayName(),"************************");
//            }
//            else
                {

                userProps.put(prop.getDisplayName(),dbCatalogProperties.get(prop.getName()));
            }
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

    public List<Catalog> getAllCatalogs(String userId) {
        List<Catalog> catalogs = this.catalogRepository.findAllByUserId(userId);
        return catalogs;
    }

    public Catalog saveCatalog(Catalog catalog) {
        return this.catalogRepository.save(catalog);
    }

    public Optional<Catalog> getCatalogByCatalogIdAndUserId(String catalogId, String userId) {
        return this.catalogRepository.findCatalogByIdEqualsAndUserIdEquals(catalogId,userId);
    }

    public void deleteCatalog(Catalog catalog) {
        this.catalogRepository.delete(catalog);
    }

    public List<Catalog> getCatalogs(List<String> catalogIds, String userId) {
        return this.catalogRepository.findByIdInAndUserIdEquals(catalogIds, userId);
    }
}
