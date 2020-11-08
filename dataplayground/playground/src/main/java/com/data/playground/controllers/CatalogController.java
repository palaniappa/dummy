package com.data.playground.controllers;

import com.data.playground.model.data.dto.CatalogDTO;
import com.data.playground.repositories.entity.Catalog;
import com.data.playground.repositories.CatalogRepository;
import com.data.playground.repositories.entity.UserModel;
import com.data.playground.util.CommonUtil;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private CatalogRepository catalogRepository;

    @RequestMapping(value = "/{catalogId}", method = RequestMethod.GET)
    public ResponseEntity<CatalogDTO> get(@PathVariable(value="catalogId") String catalogId) throws Exception {

        String userId = CommonUtil.getCurrentUserId();

        CatalogDTO retrievedCatalog = this.getByCatalogIdAndUserId(catalogId,userId);
        if(retrievedCatalog == null) {
            throw new Exception("Failed to find catalog with id " + catalogId);
        }

        return new ResponseEntity<>(retrievedCatalog, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<CatalogDTO>> getAll(){
        String userId = CommonUtil.getCurrentUserId();
        List<Catalog> catalogs = this.catalogRepository.findAllByUserId(userId);
        List<CatalogDTO> dtos = this.transform(catalogs);
        return new ResponseEntity<>(dtos,HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CatalogDTO> createOrUpdate(@RequestBody CatalogDTO catalogDto) {

        String userId = CommonUtil.getCurrentUserId();

        CatalogDTO retrievedCatalog = this.getByCatalogIdAndUserId(catalogDto.getId(), userId);

        if(retrievedCatalog == null) {
            Catalog newCatalog = new Catalog();
            newCatalog.setId(catalogDto.getId());
            newCatalog.setUserId(userId);
            newCatalog.setName(catalogDto.getName());
            newCatalog.setConnectorId(catalogDto.getConnectorId());
            newCatalog.setCatalogType(catalogDto.getCatalogType());

            Gson gson = new Gson();
            String props = gson.toJson(catalogDto.getProperties());
            newCatalog.setProperties(props);
            this.catalogRepository.save(newCatalog);

            retrievedCatalog = this.getByCatalogIdAndUserId(catalogDto.getId(), userId);
            return new ResponseEntity<>(retrievedCatalog, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(retrievedCatalog, HttpStatus.OK);

    }

    private CatalogDTO getByCatalogIdAndUserId(String catalogId, String userId) {

        Optional<Catalog> savedCatalog = this.catalogRepository.findCatalogByIdEqualsAndUserIdEquals(catalogId,userId);
        if(savedCatalog.isPresent()) {
           CatalogDTO catalogDTO = this.transform(savedCatalog.get());
           return catalogDTO;
        }
        return null;
    }

    private CatalogDTO transform(Catalog catalog) {
        if(catalog == null) {
            return  null;
        }

        CatalogDTO catalogDTO = new CatalogDTO();
        catalogDTO.setId(catalog.getId());
        catalogDTO.setName(catalog.getName());
        catalogDTO.setConnectorId(catalog.getConnectorId());
        catalogDTO.setCatalogType(catalog.getCatalogType());
        if(catalog.getProperties() != null && catalog.getProperties() != "") {
            Gson gson = new Gson();
            Type type = new TypeToken<Map<String,String>>(){}.getType();
            Map<String,String> props = gson.fromJson(catalog.getProperties(), type);
            catalogDTO.setProperties(props);
        }
        return catalogDTO;
    }

    private List<CatalogDTO> transform(List<Catalog> catalogs) {
        if(catalogs == null)
            return null;

        List<CatalogDTO> dtos = new ArrayList<>();
        for(Catalog c : catalogs) {
            dtos.add(this.transform(c));
        }
        return dtos;
    }

    @RequestMapping(value = "/{catalogId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@PathVariable(value="catalogId") String catalogId) throws Exception {

        String userId = CommonUtil.getCurrentUserId();

        Optional<Catalog> retrievedCatalog = this.catalogRepository.findCatalogByIdEqualsAndUserIdEquals(catalogId,userId);
        if(retrievedCatalog.isPresent()) {
            this.catalogRepository.delete(retrievedCatalog.get());
        }

        return new ResponseEntity<>(catalogId, HttpStatus.OK);
    }
}
