import { CatalogModel } from "../../models/catalog/CatalogModel";
import { ActionType } from 'typesafe-actions';
import * as refreshActions from './refresh-actions';
import * as createActions from './catalogActions';

export type CatalogRefreshActions = ActionType<typeof refreshActions>  | refreshActions.CatalogRefreshLoadingAction | refreshActions.CatalogRefreshAction | refreshActions.CatalogRefreshFailedAction;
export type CatalogCreateActions = ActionType<typeof createActions>;
export type CatalogActions = CatalogRefreshActions | CatalogCreateActions;


export interface CatalogState {
    catalogItems: CatalogGridState;
    createCatalog: CreateCatalogState;
}

export interface CatalogGridState {
    items: Array<CatalogModel>;
    loading: boolean;
    error?: String;
}

export interface CreateCatalogState {
    creating: boolean;
    error?: string;
}

export enum CatalogConstants {
    SET_LOADING = 'SET_LOADING'
    , REFRESH_CATALOG = 'REFRESH_CATALOG'
    , REFRESH_FAILED = 'REFRESH_FAILED'
    , SET_CREATING = 'SET_CREATING'
    , CREATE_FAILED = 'CREATE_FAILED'
}

