package com.data.playground.services;

import com.data.playground.model.data.dto.CatalogTablesDTO;
import com.data.playground.repositories.TableRepository;
import com.data.playground.repositories.entity.DPTable;
import com.data.playground.util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    public List<CatalogTablesDTO> getTablesInCatalog(String catalogId) {
        List<CatalogTablesDTO> items = new ArrayList<>();
        String userId = CommonUtil.getCurrentUserId();
        List<DPTable> tables = this.tableRepository.findDPTablesByCatalogIdAndUserId(catalogId, userId);
        tables.forEach( t -> {
            CatalogTablesDTO tableDto = new CatalogTablesDTO(t.getName(), t.getId() );
            items.add(tableDto);
        });
        return items;
    }

    public Optional<DPTable> getTable(String tableId, String userId) {
        return this.tableRepository.findDPTablesByIdAndUserId(tableId, userId);
    }

    public DPTable upsertTable(DPTable table) {
        return this.tableRepository.save(table);
    }

    public List<DPTable> getTables(List<String> tableIds, String userId) {
        List<DPTable> tables = new ArrayList<>();
        if(tableIds != null && tableIds.size() > 0 && userId != null && userId != "") {
            tables = this.tableRepository.findDPTablesByIdInAndUserIdEquals(tableIds,userId);
        }
        return  tables;
    }
}
