import { combineReducers, createStore } from 'redux';
import { CatalogState } from './catalog/types';
import { catalogReducer }  from './catalog/reducer';
import { demoReducer } from './demo/reducer';
import { IDemoState } from './demo/types';
import { QueryState } from './query/queryState';
import { queryReducer } from './query/queryReducer';
import { PlayGroundAppState } from './playGroundApp/playGroundAppState';
import { playGroundAppReducer } from './playGroundApp/playGroundAppReducers';
import { TableState } from './table/tableState';
import { tableReducer } from './table/tableReducer';



export interface ApplicationRootState {
    demo: IDemoState;
    catalog: CatalogState;
    query: QueryState; 
    playGroundApp: PlayGroundAppState;
    table: TableState;
}



const store = createStore<ApplicationRootState, any, any, any>(
    combineReducers({
        demo: demoReducer
        ,catalog: catalogReducer
        ,query: queryReducer
        ,playGroundApp: playGroundAppReducer
        ,table: tableReducer
    }));

export default store;