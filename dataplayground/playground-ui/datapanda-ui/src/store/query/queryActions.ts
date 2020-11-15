import { Action } from 'redux';
import { QueryResult } from '../../models/query/QueryReuslt';

export enum QueryConstants {
    SET_EXECUTING = 'SET_EXECUTING',
    EXECUTE_FAILED = 'EXECUTE_FAILED',
    EXECUTE_FINISHED = 'EXECUTE_FINISHED'
    
}

interface QuerySetExecutingAction  extends Action<QueryConstants.SET_EXECUTING> {
    executing: boolean;
    query: String;
} 

export function setExecuting( executing: boolean, query: String ): QuerySetExecutingAction {
    return {
        type: QueryConstants.SET_EXECUTING
        , executing
        , query
    };
}

interface QueryExecutionFailedAction  extends Action<QueryConstants.EXECUTE_FAILED> {
    errorMessage: String;
} 
export function exeucteFailed( errorMessage: String ): QueryExecutionFailedAction {
    return {
        type: QueryConstants.EXECUTE_FAILED
        , errorMessage
    };
}

interface QueryExectionFinishedAction extends Action<QueryConstants.EXECUTE_FINISHED> {
    queryResult: QueryResult
}

export function executionFinished( queryResult: QueryResult): any {
    return {
        type: QueryConstants.EXECUTE_FINISHED
        , queryResult
    };
}

export type QueryActions = QuerySetExecutingAction | QueryExecutionFailedAction | QueryExectionFinishedAction; 