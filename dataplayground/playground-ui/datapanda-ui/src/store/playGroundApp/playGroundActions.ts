import { Action } from 'redux';

export enum PlayGroundConstants {
    SET_CURRENT_MENU = 'SET_CURRENT_MENU'
    , LOGIN = 'LOGIN'
    , LOGOUT = 'LOGOUT'
    , LOGIN_ERROR = 'LOGIN_ERROR'
}


interface PlayGroundMenuSelectAction  extends Action<PlayGroundConstants.SET_CURRENT_MENU> {
    selectedItem: string;
} 
export function selectMenuItem( selectedItem: string ): PlayGroundMenuSelectAction {
    return {
        type: PlayGroundConstants.SET_CURRENT_MENU
        , selectedItem
    };
}

interface PlayGroundLoginAction  extends Action<PlayGroundConstants.LOGIN> {
    userName: string;
    userEmail: string;
} 
export function login( userName: string, userEmail: string ): PlayGroundLoginAction {
    return {
        type: PlayGroundConstants.LOGIN
        , userName
        , userEmail
    };
}

interface PlayGroundLoginErrorAction  extends Action<PlayGroundConstants.LOGIN_ERROR> {
    errorMessage: string;
} 
export function loginError( errorMessage: string ): PlayGroundLoginErrorAction {
    return {
        type: PlayGroundConstants.LOGIN_ERROR
        , errorMessage
    };
}

interface PlayGroundLogoutAction  extends Action<PlayGroundConstants.LOGOUT> {

} 
export function logout(): PlayGroundLogoutAction {
    return {
        type: PlayGroundConstants.LOGOUT
    };
}

export type PlayGroundAppActions = PlayGroundMenuSelectAction | PlayGroundLoginAction | PlayGroundLoginErrorAction | PlayGroundLogoutAction;