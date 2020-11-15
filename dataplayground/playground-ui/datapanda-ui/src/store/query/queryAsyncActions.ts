import { QueryActions, setExecuting, exeucteFailed, executionFinished } from "./queryActions";
import { Dispatch } from 'redux';
import { PlayGroundService } from '../../service/PlayGroundService';


export async function executeQuery( dispatch: Dispatch<QueryActions>, sqlQuery: String) {
    dispatch(setExecuting(true, sqlQuery));
    PlayGroundService.getInstance().executeSql(sqlQuery).then( (result) => {
        dispatch(setExecuting(false, sqlQuery));
        dispatch(executionFinished(result));
    })
    .catch(
        (error) => {
            dispatch(exeucteFailed(error.message));
        }
    );
    
}