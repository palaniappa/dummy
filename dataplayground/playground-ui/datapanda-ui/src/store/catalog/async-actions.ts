import { CatalogActions } from "./types";
import { Dispatch } from 'redux';
import * as refreshActions from './refresh-actions';
import * as createActions from './create-catalog-actions';
import { PlayGroundService } from "../../service/PlayGroundService";
import { CatalogModel } from "../../models/catalog/CatalogModel";


function sleep(timeout: number) {
    return new Promise((resolve) => setTimeout(() => resolve(), timeout));
}

export async function loadCatalogs(dispatch: Dispatch<CatalogActions>) {
    dispatch(refreshActions.setLoading(true));

    //make the server call
    PlayGroundService.getInstance().getCatalogItems().then( (items) => {
        dispatch(refreshActions.refereshCatalogs(items));
    })
    .catch(
        (error) => {
            dispatch(refreshActions.refereshFailed(error.message));
        }
    );
}

export async function addCatalog( dispatch: Dispatch<CatalogActions>, catalog: CatalogModel) {
    dispatch(createActions.setCreating(true));
    PlayGroundService.getInstance().createCatalog(catalog).then( (items) => {
        dispatch(createActions.setCreating(false));
        loadCatalogs(dispatch);
    })
    .catch(
        (error) => {
            dispatch(refreshActions.refereshFailed(error.message));
        }
    );
    
}