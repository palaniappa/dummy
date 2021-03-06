import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { QueryResult } from "../models/query/QueryReuslt";
import { QueryRequest } from "../models/query/QueryRequest";
import { CatalogModel } from '../models/catalog/CatalogModel';
import { CatalogTable } from '../models/catalog/CatalogTables';
import { TableDetails } from '../models/table/TableDetails';
import { TableSchema, TableSchemaRequest } from "../models/table/TableSchema";
import { ChartDefinition, DashboardDefinition } from "../models/dashboard/DashboardModel";

export class PlayGroundService {

    private readonly baseUrl: string = "http://localhost:10080"
    private readonly API_PATH_CATALOG = "catalog";
    private readonly API_PATH_DASHBOARD = "dashboard";
    private readonly API_PATH_TABLE = "table";

    private static instance: PlayGroundService = new PlayGroundService();

    public static getInstance(): PlayGroundService {
        return this.instance;
    }

    public async getCatalogItems(): Promise<Array<CatalogModel>> {

        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<Array<CatalogModel>> = await Axios.get(this.getResourceUrl(this.API_PATH_CATALOG), config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async createCatalog(catalog: CatalogModel): Promise<CatalogModel> {

        try {
            let config = this.getCallConfig();
            let createdCatalog: AxiosResponse<CatalogModel> = await Axios.post(this.getResourceUrl(this.API_PATH_CATALOG), catalog, config);
            return createdCatalog.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async deleteCatalog(catalogId: string): Promise<void> {
        try {
            let config = this.getCallConfig();
            await Axios.delete(this.getResourceUrl(this.API_PATH_CATALOG + "/" + catalogId), config);
            return;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async getCatalogTables(catalogId: string): Promise<Array<CatalogTable>> {
        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<Array<CatalogTable>> = await Axios.get(this.getResourceUrl(this.API_PATH_CATALOG + '/' + catalogId + '/table'), config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async getTableDetails(tableId: string): Promise<TableDetails> {
        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<TableDetails> = await Axios.get(this.getResourceUrl(this.API_PATH_TABLE + '/' + tableId), config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async createTable(table: TableDetails): Promise<TableDetails> {
        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<TableDetails> = await Axios.post(this.getResourceUrl(this.API_PATH_TABLE), table, config);
            return result.data;

        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }

    }

    public async alanlyzeTableSchema(tableSchemaRequest: TableSchemaRequest) : Promise<TableSchema> {
        try {

            let config = this.getCallConfig();
            let result: AxiosResponse<TableSchema> = await Axios.post(
                    this.getResourceUrl(this.API_PATH_TABLE) + "/analyzeSchema", tableSchemaRequest
                    , config);
            return result.data;
        }
        catch (error) {
            return { fields: [], samplesRows:[], resultMessage: error.response.data.message};
        }
    }

    public async deleteTable(tableId: string): Promise<void> {
        try {
            let config = this.getCallConfig();
            await Axios.delete(this.getResourceUrl(this.API_PATH_TABLE + "/" + tableId), config);
            return;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async executeSql(query: String): Promise<QueryResult> {
        const API_PATH = "query/sql";
        console.log("Executing the query " + query);
        let req: QueryRequest = { sql: query };

        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<QueryResult> = await Axios.post(this.getResourceUrl(API_PATH), req, config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async getDashboards(): Promise<Array<DashboardDefinition>> {

        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<Array<DashboardDefinition>> = await Axios.get(this.getResourceUrl(this.API_PATH_DASHBOARD), config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async upsertDashboard(dashboard: DashboardDefinition): Promise<DashboardDefinition> {

        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<DashboardDefinition> = await Axios.post(this.getResourceUrl(this.API_PATH_DASHBOARD), dashboard, config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async deleteDashboard(dashboadId: string): Promise<void> {
        try {
            let config = this.getCallConfig();
            await Axios.delete(this.getResourceUrl(this.API_PATH_DASHBOARD + "/" + dashboadId), config);
            return;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async getDashboardCharts(dashboardId: string): Promise<Array<ChartDefinition>> {

        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<Array<ChartDefinition>> = await Axios.get(this.getResourceUrl(this.API_PATH_DASHBOARD + "/"+ dashboardId + "/chart"), config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async upsertDashboardChart(dashboardId: string, chart: ChartDefinition): Promise<ChartDefinition> {

        try {
            let config = this.getCallConfig();
            let result: AxiosResponse<ChartDefinition> = await Axios.post(this.getResourceUrl(this.API_PATH_DASHBOARD + "/"+ dashboardId + "/chart"), chart, config);
            return result.data;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    public async deleteDashboardChart(dashboadId: string, chartId: string): Promise<void> {
        try {
            let config = this.getCallConfig();
            await Axios.delete(this.getResourceUrl(this.API_PATH_DASHBOARD + "/" + dashboadId  + "/chart" + chartId), config);
            return;
        }
        catch (error) {
            console.log(error.response.data.message);
            throw Error(error.response.data.message);
        }
    }

    private getAccessToken(): string {
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