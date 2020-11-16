import { Action } from 'redux';
import { CatalogTables } from '../../models/catalog/CatalogTables';

export enum TableConstants {
    SET_LOADING_CATALOG_TABLES = 'SET_LOADING_CATALOG_TABLES',
    CHANGE_SELECTED_CATALOG = 'CHANGE_SELECTED_CATALOG',
    FINISH_CATALOG_TABLES_LOADING = 'FINISH_CATALOG_TABLES_LOADING'
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


export type TableActions = LoadingCatalogTablesAction | ChangeSelectedCatalogTablesAction | FinishLoadingCatalogTablesAction;