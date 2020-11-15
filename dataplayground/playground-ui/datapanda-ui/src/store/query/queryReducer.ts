import { QueryState } from './queryState';
import { QueryConstants, QueryActions } from './queryActions';
import { act } from 'react-dom/test-utils';

const init: QueryState = {
    executing: false
    , queryResult: undefined
    , sqlQuery: "select id, personname, gender, yearlyincome from hive.default.storeindividuals limit 50"
    
}

export function queryReducer(state: QueryState = init, action: QueryActions): QueryState {

    switch(action.type) {
        case QueryConstants.SET_EXECUTING:
            return { ...state, executing: action.executing, sqlQuery: action.query, errorMessage: undefined};
        case QueryConstants.EXECUTE_FAILED:
            return {...state, executing: false, errorMessage: action.errorMessage};
        case QueryConstants.EXECUTE_FINISHED:
            return {...state, queryResult: action.queryResult, executing: false, errorMessage: undefined};
        default:
            return state;
    }

}