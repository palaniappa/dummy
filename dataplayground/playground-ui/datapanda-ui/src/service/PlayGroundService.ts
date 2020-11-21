import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { QueryResult } from "../models/query/QueryReuslt";
import { QueryRequest } from "../models/query/QueryRequest";
import { CatalogModel } from '../models/catalog/CatalogModel';
import { CatalogTable } from '../models/catalog/CatalogTables';
import { TableDetails } from '../models/table/TableDetails';

export class PlayGroundService {

    private readonly baseUrl: string = "http://localhost:10080"
    private readonly API_PATH_CATALOG = "catalog";
    private readonly API_PATH_TABLE = "table";

    private static instance: PlayGroundService = new PlayGroundService();

    public static getInstance(): PlayGroundService {
        return this.instance;
    }

    public async getCatalogItems(): Promise<Array<CatalogModel>> {
        
        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<Array<CatalogModel>>  = await Axios.get(this.getResourceUrl(this.API_PATH_CATALOG), config);
            return result.data;
        }
        catch(error) {
            throw new Error(error);
        }
    }

    public async createCatalog(catalog: CatalogModel): Promise<CatalogModel> {

        try {
            let config = this.getCallConfig();
            let createdCatalog: AxiosResponse<CatalogModel>  = await Axios.post(this.getResourceUrl(this.API_PATH_CATALOG), catalog,config);
            return createdCatalog.data;
        }
        catch(error) {
            throw new Error(error);
        }

    }

    public async deleteCatalog(catalogId: string): Promise<void> {
        try {
            let config = this.getCallConfig();
            await Axios.delete(this.getResourceUrl(this.API_PATH_CATALOG + "/" + catalogId),config);
            return;
        }
        catch(error) {
            throw new Error(error);
        }
    }

    public async getCatalogTables(catalogId: string): Promise<Array<CatalogTable>> {
        let config = this.getCallConfig();
        let result: AxiosResponse<Array<CatalogTable>>  = await Axios.get(this.getResourceUrl(this.API_PATH_CATALOG + '/' + catalogId + '/table'), config);
        return result.data;
    }

    public async getTableDetails(tableId: string): Promise<TableDetails> {
        let config = this.getCallConfig();
        let result: AxiosResponse<TableDetails>  = await Axios.get(this.getResourceUrl(this.API_PATH_TABLE + '/' + tableId ), config);
        return result.data;
    }

    public async executeSql(query: String): Promise<QueryResult> {
        const API_PATH = "query/sql";
        console.log("Executing the query " + query);
        let req:QueryRequest = { sql: query};

        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<QueryResult>  = await Axios.post(this.getResourceUrl(API_PATH), req,config);
            return result.data;
        }
        catch(error) {
            throw new Error(error);
        }
    }

    private getAccessToken(): string  {
        let idtoken = localStorage.getItem("data_panda_id_token") ? 
            localStorage.getItem("data_panda_id_token") as string 
            : "";
        return idtoken;
    }

    private getCallConfig(): AxiosRequestConfig {
        let idtoken = this.getAccessToken();
        const config = {
            headers: { Authorization: `Bearer ${idtoken}` }
        };
        return config;
    }

    private getResourceUrl(apiPath: string) {
        return this.baseUrl + "/" + apiPath;
    }


} 