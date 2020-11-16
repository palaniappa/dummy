
export interface CatalogTable {
    tableId: string;
    tableName: StaticRange;
}

export interface CatalogTables {

    catalogId: string;
    catalogTables: Array<CatalogTable>;
}