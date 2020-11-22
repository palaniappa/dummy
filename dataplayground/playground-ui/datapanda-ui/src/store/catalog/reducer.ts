import { act } from 'react-dom/test-utils';
import { CatalogConstants, CatalogRefreshActions, CatalogCreateActions, CatalogState, CatalogGridState, CreateCatalogState } from './types';
import { CatalogRefreshFailedAction } from './refresh-actions';
import { combineReducers } from 'redux';
import { stat } from 'fs';

const init: CatalogState = {
    catalogItems: {
        items: [],
        loading: false,
        error: undefined  
    }, 
    createCatalog: {
        creating: false,
        error: undefined
    }
};

export function catalogRefreshReducer(state: CatalogGridState, action: CatalogRefreshActions): CatalogGridState {
    switch (action.type) {
        case CatalogConstants.REFRESH_CATALOG:
            return { ...state, items: action.payload, loading: false, error: undefined };
        case CatalogConstants.SET_LOADING:
            return { ...state, loading: action.loading };
        case CatalogConstants.REFRESH_FAILED:
            let refreshFailedAction = action as CatalogRefreshFailedAction;
            return { ...state, items: [], loading: false, error: action.errorMessage };
        default:
            return state;
    }
}

export function createCatalogReducer(state: CreateCatalogState, action: CatalogCreateActions): CreateCatalogState {

    switch(action.type) {
        case CatalogConstants.SET_CREATING:
            return {...state, creating: action.payload};
            case CatalogConstants.CREATE_FAILED:
                return { ...state, error: action.errorMessage, creating: false };
        default:
            return state;
    }
}

export function catalogReducer(state: CatalogState = init, action: CatalogRefreshActions | CatalogCreateActions): CatalogState {
    return {
        catalogItems: catalogRefreshReducer(state.catalogItems, action as CatalogRefreshActions)
        , createCatalog: createCatalogReducer(state.createCatalog, action as CatalogCreateActions)
    };
}



