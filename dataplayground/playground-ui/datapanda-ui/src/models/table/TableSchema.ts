import { TableField } from './TableDetails';

export interface TableSchema {
    fields: Array<TableField>;
    resultMessage: string;
}

export interface TableSchemaRequest { 
    catalogId: string;
    locationPath: string;
}