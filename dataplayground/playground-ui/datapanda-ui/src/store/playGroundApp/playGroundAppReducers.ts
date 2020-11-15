import { stat } from "fs";
import { action } from "typesafe-actions";
import { PlayGroundAppActions, PlayGroundConstants } from "./playGroundActions";
import { PlayGroundAppState } from "./playGroundAppState";


const init: PlayGroundAppState = {
    currentMenuItem: "/home"
    , userName: undefined
}

export function playGroundAppReducer(state: PlayGroundAppState = init, action: PlayGroundAppActions): PlayGroundAppState {

    switch (action.type) {
        case PlayGroundConstants.SET_CURRENT_MENU:
            return { ...state, currentMenuItem: action.selectedItem };
        case PlayGroundConstants.LOGIN:
            return { ...state, userName: action.userName, userEmail: action.userEmail, loginErrorMessage: undefined };
        case PlayGroundConstants.LOGOUT:
            return { ...state, userName: undefined, userEmail: undefined, loginErrorMessage: undefined };
        case PlayGroundConstants.LOGIN_ERROR:
            return { ...state, loginErrorMessage: action.errorMessage };
        default:
            return state;
    }

}