import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { QueryResult } from "../models/QueryReuslt";
import { QueryRequest } from "../models/QueryRequest";
import { request } from "http";

export class PlayGroundService {

    private baseUrl: string = "http://localhost:10080"

    private static instance: PlayGroundService = new PlayGroundService();

    public static getInstance(): PlayGroundService {
        return this.instance;
    }

    private getResourceUrl(apiPath: string) {
        return this.baseUrl + "/" + apiPath;
    }

    public async executeSql(query: string): Promise<QueryResult> {
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
} 