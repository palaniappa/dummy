import { isInterfaceDeclaration } from "typescript";
import { QueryResultColumn } from "./QueryResultColumn";
import { QueryResultRecord } from './QueryResultRecord';


export interface QueryResult {
    recordCount: number;
    done: boolean;
    columns: Array<QueryResultColumn>;
    records: Array<QueryResultRecord>;
}