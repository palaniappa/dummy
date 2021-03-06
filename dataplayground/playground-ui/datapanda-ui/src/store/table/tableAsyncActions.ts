import { Dispatch } from "redux";
import { TableActions, setLoadingCatalogTables, changeSelectedCatalog, finishLoadingCatalogTables, changeSelectedTable, finishLoadingTableDetails } from "./tableActions";
import { PlayGroundService } from '../../service/PlayGroundService';
import { CatalogTables } from "../../models/catalog/CatalogTables";
import { TableDetails } from "../../models/table/TableDetails";
import { TableSchema, TableSchemaRequest } from "../../models/table/TableSchema";


export async function loadTablesOfSelectedCatalog( dispatch: Dispatch<TableActions>, selectedCatalogId: string): Promise<void | CatalogTables> {

    dispatch(changeSelectedCatalog(selectedCatalogId));
    dispatch(setLoadingCatalogTables(true));
    return PlayGroundService.getInstance().getCatalogTables(selectedCatalogId).then( (items) => {
        let catalogTables: CatalogTables = {
            catalogId: selectedCatalogId
            , catalogTables: items
        };
        dispatch(finishLoadingCatalogTables(catalogTables));
        return catalogTables;
    })
    .catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    )
}

export async function loadTableDetails(dispatch: Dispatch<TableActions>, selectedTableId: string): Promise<void|TableDetails> {

    dispatch(changeSelectedTable(selectedTableId));
    return PlayGroundService.getInstance().getTableDetails(selectedTableId).then( (tableDetails: TableDetails) => {
        dispatch(finishLoadingTableDetails(tableDetails));
        return tableDetails;
    })
    .catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    )
    ;

}


export async function createTable(dispatch: Dispatch<TableActions>, tableDetails: TableDetails) : Promise<void|TableDetails> {

    return PlayGroundService.getInstance().createTable(tableDetails).then( (tableDetails: TableDetails) => {
        loadTablesOfSelectedCatalog(dispatch,tableDetails.catalogId).then( () => {
            loadTableDetails(dispatch,tableDetails.tableName);
        });
        
        return tableDetails;
    }).catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    );
}

export async function analyzeTableSchema(dispatch: Dispatch<TableActions>, catalogId: string, tableNameOrLocationPath: string) : Promise<void|TableSchema> {
    let tableSchemaRequest: TableSchemaRequest = {catalogId, tableNameOrLocationPath: tableNameOrLocationPath };
    return PlayGroundService.getInstance().alanlyzeTableSchema(tableSchemaRequest);
}

export async function deleteTable(dispatch: Dispatch<TableActions>, tableId: string) : Promise<void|string> {

    return PlayGroundService.getInstance().deleteTable(tableId).catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    );
}