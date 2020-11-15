import { combineReducers, createStore } from 'redux';
import { CatalogState } from './catalog/types';
import { catalogReducer }  from './catalog/reducer';
import { demoReducer } from './demo/reducer';
import { IDemoState } from './demo/types';



export interface ApplicationRootState {
    demo: IDemoState;
    catalog: CatalogState;
    
}



const store = createStore<ApplicationRootState, any, any, any>(
    combineReducers({
        demo: demoReducer
        ,catalog: catalogReducer
    }));

export default store;