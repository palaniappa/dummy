package com.data.playground.repositories;

import com.data.playground.repositories.entity.Catalog;
import org.springframework.data.repository.CrudRepository;

public interface CatalogRepository extends CrudRepository<Catalog, String> {
}
