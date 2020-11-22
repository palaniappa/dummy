package com.data.playground.repositories;

import com.data.playground.repositories.entity.DPTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface TableRepository extends JpaRepository<DPTable,String> {

    Optional<DPTable> findDPTablesByIdAndUserId(String id, String userId);
    List<DPTable> findDPTablesByCatalogIdAndUserId(String catalogId, String userId);
    List<DPTable> findDPTablesByIdInAndUserIdEquals(List<String> tableIds, String userId);
}
