import { QueryResult } from '../../models/query/QueryReuslt';
import { CatalogModel } from '../../models/catalog/CatalogModel';
import { FetchState } from '../../models/FetchState';

export interface ICreateCatalogComponentState {

}

export interface ICatalogComponentState {
    items?: Array<CatalogModel>;
    fetchState: FetchState; 
}

export interface IQueryResultComponentState {

}

export interface IPlayGroundState {
    currentSql: string;
    executing: boolean;
    queryData?: QueryResult;
    error?: string;
    loggedInUserEmail?: string;
    loggedInUserName?: string;
    currentMenuItem: string;
    catalog: ICatalogComponentState;
    createCatalog?: ICreateCatalogComponentState;
}