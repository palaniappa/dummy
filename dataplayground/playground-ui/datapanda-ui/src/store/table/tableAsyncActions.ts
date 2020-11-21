import { Dispatch } from "redux";
import { TableActions, setLoadingCatalogTables, changeSelectedCatalog, finishLoadingCatalogTables, changeSelectedTable, finishLoadingTableDetails } from "./tableActions";
import { PlayGroundService } from '../../service/PlayGroundService';
import { CatalogTables } from "../../models/catalog/CatalogTables";
import { TableDetails } from "../../models/table/TableDetails";


export async function loadTablesOfSelectedCatalog( dispatch: Dispatch<TableActions>, selectedCatalogId: string) {

    dispatch(changeSelectedCatalog(selectedCatalogId));
    dispatch(setLoadingCatalogTables(true));
    PlayGroundService.getInstance().getCatalogTables(selectedCatalogId).then( (items) => {
        let catalogTables: CatalogTables = {
            catalogId: selectedCatalogId
            , catalogTables: items
        };
        dispatch(finishLoadingCatalogTables(catalogTables));
    })
    .catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    )
}

export async function loadTableDetails(dispatch: Dispatch<TableActions>, selectedTableId: string) {

    dispatch(changeSelectedTable(selectedTableId));
    PlayGroundService.getInstance().getTableDetails(selectedTableId).then( (tableDetails: TableDetails) => {
        dispatch(finishLoadingTableDetails(tableDetails));
    });

}