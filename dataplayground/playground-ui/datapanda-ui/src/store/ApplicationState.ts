import { combineReducers, createStore } from 'redux';
import { CatalogState } from './catalog/types';
import { catalogReducer }  from './catalog/reducer';
import { demoReducer } from './demo/reducer';
import { IDemoState } from './demo/types';
import { QueryState } from './query/queryState';
import { queryReducer } from './query/queryReducer';



export interface ApplicationRootState {
    demo: IDemoState;
    catalog: CatalogState;
    query: QueryState; 
}



const store = createStore<ApplicationRootState, any, any, any>(
    combineReducers({
        demo: demoReducer
        ,catalog: catalogReducer
        ,query: queryReducer
    }));

export default store;