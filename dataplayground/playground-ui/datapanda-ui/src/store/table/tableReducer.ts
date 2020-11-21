import { TableActions, TableConstants } from "./tableActions";
import { TableState } from "./tableState";


const init: TableState = {
    selectedDataSource: "NONE"
    , selectedTableId: "NONE"
    , catalogTables: undefined
    , loadingCatalogTables: false
};

export function tableReducer(state: TableState = init, action: TableActions): TableState {
    switch (action.type) {
        case TableConstants.SET_LOADING_CATALOG_TABLES:
            return {...state, loadingCatalogTables: action.loading};
        case TableConstants.CHANGE_SELECTED_CATALOG:
            return {...state, selectedDataSource: action.selectedCatalogId};
        case TableConstants.FINISH_CATALOG_TABLES_LOADING:
            return {...state, catalogTables: action.catalogTables, selectedDataSource: action.catalogTables.catalogId, loadingCatalogTables: false};
        case TableConstants.CHANGE_SELECTED_TABLE:
            return {...state, selectedTableId: action.selectedTableId, tableDetails: undefined};
        case TableConstants.FINISH_TABLE_DETAILS_LOADING:
            return {...state, tableDetails: action.tableDetails};
        default:
            return state;
    }
}