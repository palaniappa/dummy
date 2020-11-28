import { TableField } from './TableDetails';

export interface TableSchema {
    fields: Array<TableField>;
    samplesRows: Array<Array<String>>;
    resultMessage: string;
}

export interface TableSchemaRequest { 
    catalogId: string;
    tableNameOrLocationPath: string;
}