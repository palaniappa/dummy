import { CatalogTables } from '../../models/catalog/CatalogTables';
import { TableDetails } from '../../models/table/TableDetails';

export interface TableState {
    selectedDataSource: string;
    catalogTables?: CatalogTables;
    loadingCatalogTables: boolean;
    selectedTableId: string;
    tableDetails?:TableDetails;
}