package com.data.playground.controllers;

import com.data.playground.exception.PlaygroundException;
import com.data.playground.model.data.dto.Catalog;
import com.data.playground.model.data.dto.CatalogTablesDTO;
import com.data.playground.services.CatalogService;
import com.data.playground.services.TableService;
import com.data.playground.util.CommonUtil;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "catalog")
public class CatalogController {


    @Autowired
    private CatalogService catalogService;

    @Autowired
    private TableService tableService;

    @RequestMapping(value = "/{catalogId}", method = RequestMethod.GET)
    public ResponseEntity<Catalog> get(@PathVariable(value="catalogId") String catalogId) throws Exception {

        String userId = CommonUtil.getCurrentUserId();

        Catalog retrievedCatalog = this.getByCatalogIdAndUserId(catalogId,userId);
        if(retrievedCatalog == null) {
            throw new Exception("Failed to find catalog with id " + catalogId);
        }

        return new ResponseEntity<>(retrievedCatalog, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Catalog>> getAll() throws PlaygroundException {
        String userId = CommonUtil.getCurrentUserId();
        List<com.data.playground.repositories.entity.Catalog> catalogs = this.catalogService.getAllCatalogs(userId);
        List<Catalog> dtos = this.transform(catalogs);
        return new ResponseEntity<>(dtos,HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Catalog> createOrUpdate(@RequestBody Catalog catalogDto) throws PlaygroundException {

        String userId = CommonUtil.getCurrentUserId();


        if(CommonUtil.isEmpty(catalogDto.getId())
                || CommonUtil.isEmpty(catalogDto.getName())
                || CommonUtil.isEmpty(catalogDto.getDatabaseName())
                || CommonUtil.isEmpty(catalogDto.getName())
                || catalogDto.getProperties() == null
        ) {
            throw  new PlaygroundException(HttpStatus.BAD_REQUEST, "Invalid catalog object. Please ensure all required fiwlds are filled.");
        }
        Catalog retrievedCatalog = this.getByCatalogIdAndUserId(catalogDto.getId(), userId);

        if(retrievedCatalog == null) {
            com.data.playground.repositories.entity.Catalog newCatalog = new com.data.playground.repositories.entity.Catalog();
            newCatalog.setId(catalogDto.getId());
            newCatalog.setUserId(userId);
            newCatalog.setName(catalogDto.getName());
            newCatalog.setDatabaseName(catalogDto.getDatabaseName());
            String storeCatalogType = catalogService.getCatalogType(catalogDto.getCatalogType());
            newCatalog.setCatalogType(storeCatalogType);
            newCatalog.setConnectorId(catalogService.getConnectorIdForCatalogType(storeCatalogType));

            Gson gson = new Gson();
            String props = gson.toJson(this.catalogService.getStoreCatalogProperties(storeCatalogType,catalogDto.getProperties()));
            newCatalog.setProperties(props);
            this.catalogService.saveCatalog(newCatalog);

            retrievedCatalog = this.getByCatalogIdAndUserId(catalogDto.getId(), userId);
            return new ResponseEntity<>(retrievedCatalog, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(retrievedCatalog, HttpStatus.OK);

    }

    private Catalog getByCatalogIdAndUserId(String catalogId, String userId) throws PlaygroundException {

        Optional<com.data.playground.repositories.entity.Catalog> savedCatalog = this.catalogService.getCatalogByCatalogIdAndUserId(catalogId,userId);
        if(savedCatalog.isPresent()) {
           Catalog catalogDTO = this.transform(savedCatalog.get());
           return catalogDTO;
        }
        return null;
    }

    private Catalog transform(com.data.playground.repositories.entity.Catalog catalog) throws PlaygroundException {
        if(catalog == null) {
            return  null;
        }

        Catalog catalogDTO = new Catalog();
        catalogDTO.setId(catalog.getId());
        catalogDTO.setName(catalog.getName());
        catalogDTO.setDatabaseName(catalog.getDatabaseName());
        catalogDTO.setCatalogType(catalogService.getUserCatalogType(catalog.getCatalogType()));
        if(catalog.getProperties() != null && catalog.getProperties() != "") {
            Gson gson = new Gson();
            Type type = new TypeToken<Map<String,String>>(){}.getType();
            Map<String,String> props = gson.fromJson(catalog.getProperties(), type);
            catalogDTO.setProperties(this.catalogService.getUserCatalogProperties(catalog.getCatalogType(), props));
        }
        return catalogDTO;
    }

    private List<Catalog> transform(List<com.data.playground.repositories.entity.Catalog> catalogs) throws PlaygroundException {
        if(catalogs == null)
            return null;

        List<Catalog> dtos = new ArrayList<>();
        for(com.data.playground.repositories.entity.Catalog c : catalogs) {
            dtos.add(this.transform(c));
        }
        return dtos;
    }

    @RequestMapping(value = "/{catalogId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@PathVariable(value="catalogId") String catalogId) throws Exception {

        String userId = CommonUtil.getCurrentUserId();

        Optional<com.data.playground.repositories.entity.Catalog> retrievedCatalog = this.catalogService.getCatalogByCatalogIdAndUserId(catalogId,userId);
        if(retrievedCatalog.isPresent()) {
            this.catalogService.deleteCatalog(retrievedCatalog.get());
        }

        return new ResponseEntity<>(catalogId, HttpStatus.OK);
    }

    @RequestMapping(value = "/{catalogId}/table", method = RequestMethod.GET)
    public ResponseEntity<List<CatalogTablesDTO>> getTables(@PathVariable(value="catalogId") String catalogId) throws Exception {

        String userId = CommonUtil.getCurrentUserId();

        Catalog retrievedCatalog = this.getByCatalogIdAndUserId(catalogId,userId);
        if(retrievedCatalog == null) {
            throw new Exception("Failed to find catalog with id " + catalogId);
        }

        List<CatalogTablesDTO> tables = this.tableService.getTablesInCatalog(retrievedCatalog.getId());

        return new ResponseEntity<>(tables, HttpStatus.OK);
    }
}
