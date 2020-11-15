import { action } from "typesafe-actions";
import { PlayGroundConstants } from "./playGroundActions";
import { PlayGroundAppState } from "./playGroundAppState";


const init: PlayGroundAppState = {
    currentMenuItem: "/query"
}

export function playGroundAppReducer( state: PlayGroundAppState = init, action: any) : PlayGroundAppState {

    switch(action.type){
        case PlayGroundConstants.SET_CURRENT_MENU:
            return { ...state, currentMenuItem: action.selectedItem};
        default:
            return state;
    }

}