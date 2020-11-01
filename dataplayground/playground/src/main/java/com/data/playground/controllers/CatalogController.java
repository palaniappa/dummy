package com.data.playground.controllers;

import com.data.playground.model.data.dto.CatalogDTO;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.repositories.CatalogRepository;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "catalog")
public class CatalogController {

    @Autowired
    private CatalogRepository catalogRepository;

    @RequestMapping(value = "/{catalogId}", method = RequestMethod.GET)
    public ResponseEntity<CatalogDTO> get(@PathVariable(value="catalogId") String catalogId) throws Exception {

        CatalogDTO retrievedCatalog = this.getByCatalogId(catalogId);
        if(retrievedCatalog == null) {
            throw new Exception("Failed to find catalog with id " + catalogId);
        }

        return new ResponseEntity<>(retrievedCatalog, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CatalogDTO> createOrUpdate(@RequestBody CatalogDTO catalog) {

        Catalog newCatalog = new Catalog();
        newCatalog.setId(catalog.getId());
        newCatalog.setUserId(catalog.getUserId());
        newCatalog.setName(catalog.getName());
        newCatalog.setConnectorId(catalog.getConnectorId());
        newCatalog.setCatalogType(catalog.getCatalogType());
        Gson gson = new Gson();
        String props = gson.toJson(catalog.getProperties());
        newCatalog.setProperties(props);
        this.catalogRepository.save(newCatalog);
        CatalogDTO retrievedCatalog = this.getByCatalogId(catalog.getId());
        return new ResponseEntity<>(retrievedCatalog, HttpStatus.CREATED);
    }

    private CatalogDTO getByCatalogId(String catalogId) {

        Optional<Catalog> savedCatalog = this.catalogRepository.findById(catalogId);
        if(savedCatalog.isPresent()) {
           CatalogDTO catalogDTO = new CatalogDTO();
           catalogDTO.setId(savedCatalog.get().getId());
           catalogDTO.setUserId(savedCatalog.get().getUserId());
           catalogDTO.setName(savedCatalog.get().getName());
           catalogDTO.setConnectorId(savedCatalog.get().getConnectorId());
           catalogDTO.setCatalogType(savedCatalog.get().getCatalogType());
           if(savedCatalog.get().getProperties() != null && savedCatalog.get().getProperties() != "") {
               Gson gson = new Gson();
               Type type = new TypeToken<Map<String,String>>(){}.getType();
               Map<String,String> props = gson.fromJson(savedCatalog.get().getProperties(), type);
               catalogDTO.setProperties(props);
           }
           return catalogDTO;
        }
        return null;
    }
}
