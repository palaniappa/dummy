package com.data.playground.repositories;

import com.data.playground.repositories.entity.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CatalogRepository extends JpaRepository<Catalog, String> {

    Optional<Catalog> findCatalogByIdEqualsAndUserIdEquals(String id, String userId);
    List<Catalog> findAllByUserId(String userId);
    List<Catalog> findByIdInAndUserIdEquals(List<String> catalogIds, String userId);
}
