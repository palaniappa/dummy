import { Action } from 'redux';
import { CatalogTables } from '../../models/catalog/CatalogTables';
import { TableDetails } from '../../models/table/TableDetails';

export enum TableConstants {
    SET_LOADING_CATALOG_TABLES = 'SET_LOADING_CATALOG_TABLES',
    CHANGE_SELECTED_CATALOG = 'CHANGE_SELECTED_CATALOG',
    FINISH_CATALOG_TABLES_LOADING = 'FINISH_CATALOG_TABLES_LOADING',
    CHANGE_SELECTED_TABLE = 'CHANGE_SELECTED_TABLE',
    FINISH_TABLE_DETAILS_LOADING = 'FINISH_TABLE_DETAILS_LOADING'
}

interface LoadingCatalogTablesAction  extends Action<TableConstants.SET_LOADING_CATALOG_TABLES> {
    loading: boolean;
} 

export function setLoadingCatalogTables( loading: boolean ): LoadingCatalogTablesAction {
    return {
        type: TableConstants.SET_LOADING_CATALOG_TABLES
        , loading
        
    };
}


interface ChangeSelectedCatalogTablesAction  extends Action<TableConstants.CHANGE_SELECTED_CATALOG> {
    selectedCatalogId: string;
} 

export function changeSelectedCatalog( selectedCatalogId: string ): ChangeSelectedCatalogTablesAction {
    return {
        type: TableConstants.CHANGE_SELECTED_CATALOG
        , selectedCatalogId
        
    };
}

interface FinishLoadingCatalogTablesAction  extends Action<TableConstants.FINISH_CATALOG_TABLES_LOADING> {
    catalogTables: CatalogTables;
} 

export function finishLoadingCatalogTables( catalogTables: CatalogTables ): FinishLoadingCatalogTablesAction {
    return {
        type: TableConstants.FINISH_CATALOG_TABLES_LOADING
        , catalogTables
        
    };
}

interface ChangeSelectedTableAction  extends Action<TableConstants.CHANGE_SELECTED_TABLE> {
    selectedTableId: string;
} 

export function changeSelectedTable( selectedTableId: string ): ChangeSelectedTableAction {
    return {
        type: TableConstants.CHANGE_SELECTED_TABLE
        , selectedTableId
    };
}

interface FinishLoadingTableDetailsAction  extends Action<TableConstants.FINISH_TABLE_DETAILS_LOADING> {
    tableDetails: TableDetails;
} 

export function finishLoadingTableDetails( tableDetails: TableDetails ): FinishLoadingTableDetailsAction {
    return {
        type: TableConstants.FINISH_TABLE_DETAILS_LOADING
        , tableDetails
        
    };
}


    export type TableActions = LoadingCatalogTablesAction | ChangeSelectedCatalogTablesAction | FinishLoadingCatalogTablesAction | ChangeSelectedTableAction | FinishLoadingTableDetailsAction;