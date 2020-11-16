import { CatalogType } from "./CatalogType";

export interface CatalogModel {
    id: string,
    name: string,
    catalogType: CatalogType,
    properties: {[name:string]:string};
}