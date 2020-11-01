package com.data.playground.controllers;

import com.data.playground.model.entity.Catalog;
import com.data.playground.repositories.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "catalog")
public class CatalogController {

    @Autowired
    private CatalogRepository catalogRepository;

    @RequestMapping(value = "/{catalogId}", method = RequestMethod.GET)
    public ResponseEntity<Catalog> get(@PathVariable(value="catalogId") String catalogId) throws Exception {

        Optional<Catalog> userCatalog = this.catalogRepository.findById(catalogId);
        if(!userCatalog.isPresent()) {
            throw new Exception("Failed to find catalog with id " + catalogId);
        }
        return new ResponseEntity<>(userCatalog.get(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Catalog> createOrUpdate(@RequestBody Catalog catalog) {

        Catalog savedCatalog = this.catalogRepository.save(catalog);
        savedCatalog.setAccessKey("*");
        savedCatalog.setSecretKey("*");
        return new ResponseEntity<>(savedCatalog, HttpStatus.CREATED);

    }
}
