import { CatalogTables } from '../../models/catalog/CatalogTables';

export interface TableState {
    selectedDataSource: string;
    catalogTables?: CatalogTables;
    loadingCatalogTables: boolean;
}