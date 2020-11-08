import { CatalogType } from "./CatalogType";

export interface CatalogModel {
    id: string,
    name: string,
    connectorId: string,
    catalogType: CatalogType,
    properties: {[name:string]:string};
}