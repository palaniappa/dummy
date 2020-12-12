import { Dispatch } from 'redux';
import { QueryResult } from '../../models/query/QueryReuslt';
import { PlayGroundService } from '../../service/PlayGroundService';

export async function executeChartQuery( dispatch: Dispatch<any>, sqlQuery: String) : Promise<QueryResult> {
    return PlayGroundService.getInstance().executeSql(sqlQuery);
    
}