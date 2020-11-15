import { QueryResult } from '../../models/query/QueryReuslt';

export interface QueryState {
    executing: boolean;
    queryResult?: QueryResult;
    sqlQuery: String;
    errorMessage?: String;
}

