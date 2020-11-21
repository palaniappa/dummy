
export enum FieldType { 
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    DATE = "DATE",
    DATETIME = "DATETIME"
}

export interface TableField {
    fieldName: string,
    fieldType: FieldType
}

export interface TableDetails {
    tableName: string,
    catalogId: string,
    databaseName: string,
    locationPath: string,
    fields: Array<TableField>      
}