import { action } from 'typesafe-actions';
import { CatalogConstants } from  './types';
import { Action } from 'redux';

export function setCreating( creating: boolean ) {
    return action( CatalogConstants.SET_CREATING, creating);
}

interface CatalogCreateFailedAction  extends Action<CatalogConstants.CREATE_FAILED> {
    errorMessage: string;
} 
export function createFailed( errorMessage: string ): CatalogCreateFailedAction {
    return {
        type: CatalogConstants.CREATE_FAILED
        , errorMessage
    };
}

