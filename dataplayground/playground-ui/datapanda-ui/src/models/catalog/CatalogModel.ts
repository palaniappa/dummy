import { CatalogType } from "./CatalogType";

export interface CatalogModel {
    id: string,
    name: string,
    catalogType: CatalogType,
    databaseName: string,
    properties: {[name:string]:string};
}