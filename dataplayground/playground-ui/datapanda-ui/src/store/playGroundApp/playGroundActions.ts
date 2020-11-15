import { Action } from 'redux';

export enum PlayGroundConstants {
    SET_CURRENT_MENU = 'SET_CURRENT_MENU'
}


interface PlayGroundMenuSelectAction  extends Action<PlayGroundConstants.SET_CURRENT_MENU> {
    selectedItem: String;
} 
export function selectMenuItem( selectedItem: String ): PlayGroundMenuSelectAction {
    return {
        type: PlayGroundConstants.SET_CURRENT_MENU
        , selectedItem
    };
}

export type PlayGroundAppActions = PlayGroundMenuSelectAction;