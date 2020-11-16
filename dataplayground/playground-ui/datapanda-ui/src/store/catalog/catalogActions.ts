import { action } from 'typesafe-actions';
import { CatalogConstants } from  './types';
import { Action } from 'redux';

export function setCreating( creating: boolean ) {
    return action( CatalogConstants.SET_CREATING, creating);
}

