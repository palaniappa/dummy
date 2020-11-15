import { CatalogModel } from '../../models/catalog/CatalogModel';
import { CatalogConstants } from  './types';
import { Action } from 'redux';


export interface CatalogRefreshAction extends  Action<CatalogConstants.REFRESH_CATALOG> {
    payload: Array<CatalogModel>
}


export function refereshCatalogs( catalogs: Array<CatalogModel>): CatalogRefreshAction {
    //return action( CatalogConstants.REFRESH_CATALOG, { catalogs });
    let action: CatalogRefreshAction = {
        type: CatalogConstants.REFRESH_CATALOG,
        payload: catalogs
    }
    return action;
}

export interface CatalogRefreshLoadingAction extends  Action<CatalogConstants.SET_LOADING> {
    loading: boolean;
}


export function setLoading( loading: boolean ): CatalogRefreshLoadingAction {
    return { type: CatalogConstants.SET_LOADING, loading };
}

export interface CatalogRefreshFailedAction extends  Action<CatalogConstants.REFRESH_FAILED> {
    errorMessage: String;
}

export function refereshFailed( errorMessage: String): CatalogRefreshFailedAction {
    let action: CatalogRefreshFailedAction = {
        type: CatalogConstants.REFRESH_FAILED,
        errorMessage: errorMessage
    }
    return action;
}

