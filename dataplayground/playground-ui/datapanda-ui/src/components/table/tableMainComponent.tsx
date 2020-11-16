import { type } from 'os';
import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationRootState } from '../../store/ApplicationState';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { CatalogModel } from '../../models/catalog/CatalogModel';
import { CatalogActions } from '../../store/catalog/types';
import * as asyncactions from '../../store/catalog/catalogAsyncActions';
import { loadTablesOfSelectedCatalog } from '../../store/table/tableAsyncActions';
import { TableActions } from '../../store/table/tableActions';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdbreact';
import { CatalogTable, CatalogTables } from '../../models/catalog/CatalogTables';

interface ITableMainComponentStateProps {
    catalogs: Array<CatalogModel>;
    catalogTables?: CatalogTables;
    selectedDataSource: string;
}

const mapStateToProps = (state: ApplicationRootState): ITableMainComponentStateProps => {
    return {
        catalogs: state.catalog.catalogItems.items
        , catalogTables: state.table.catalogTables
        , selectedDataSource: state.table.selectedDataSource
    };
}

const mapDispatcherToProps = (dispatch: Dispatch<CatalogActions|TableActions>) => {
    return {
        loadCatalogs: () => asyncactions.loadCatalogs(dispatch)
        , loadTablesOfSelectedCatalog: (selectedCatalogId: string) => loadTablesOfSelectedCatalog(dispatch, selectedCatalogId)
    };
}

type ITableMainComponentProps = ITableMainComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

class TableMainComponent extends React.Component<ITableMainComponentProps, {}> {

    constructor(props: ITableMainComponentProps) {
        super(props);
    }

    public componentDidMount() {
        this.props.loadCatalogs();
    }

    render() {

        let datasources = this.getCatalogs();

        let selectedCatalogTables = this.getCatalogTableControls();

        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <br></br>
                        <p className="h4 text-center mb-4">Tables</p>
                        <MDBRow>
                            <MDBCol md="3">
                                {datasources}
                                <br></br>
                                {selectedCatalogTables}
                            </MDBCol>
                            <MDBCol md="9">
                                here we will have the selected table's details.
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

    private getCatalogs(): JSX.Element {
        
        let optionValues: Array<JSX.Element> = [];
        optionValues.push(<option value={'NONE'}>Select Data Source</option>);
        this.props.catalogs.forEach( c => {
            optionValues.push(<option value={c.id}>{c.name}</option>);
        });

        return (
            <div>
                <select className="browser-default custom-select" value={this.props.selectedDataSource} onChange={this.handleDataSourceChange.bind(this)}>
                    {optionValues}
                </select>
            </div>
        );
    }

    private getCatalogTableControls(): JSX.Element {
        let columns = ["","Name", ""]

        let headers:Array<JSX.Element>  = [];
        columns.forEach( c => {
            let th = <th>{c}</th>
            headers.push(th);
        });

        let headerRow = (
            <tr key={'table_headers'}>
                {headers}
            </tr>
        );

        let contents = this.getContents();
        return (
            <MDBTable striped bordered small scrollY maxHeight="500px">
                <caption>Tables</caption>
                <MDBTableHead color="primary-color" textWhite>
                    {headerRow}
                </MDBTableHead>
                <MDBTableBody>
                    {contents}
                </MDBTableBody>
            </MDBTable>
        );
    }

    private getContents(): Array<JSX.Element> {
        
        let rows:Array<JSX.Element> = [];
        if(this.props.catalogTables?.catalogTables) {
            let index:number = 1;
            this.props.catalogTables?.catalogTables.forEach( r => {
                let row = <tr>{}</tr>
                rows.push(this.getRow(index, r));
                index++;
            })
        }
        return rows;
    }

    private getRow(index:number, catalogTable: CatalogTable): JSX.Element {

        let deleteIcon = (<td><MDBIcon id={catalogTable.tableId} icon="trash-alt" onClick={this.onDeleteClick.bind(this)}/></td>);

        let tds: Array<JSX.Element> = [];
        tds.push(deleteIcon)
        tds.push(<td>{catalogTable.tableName}</td>);
        tds.push(<td>Show</td>);

        return (
            <tr key={"CATALOG_TABLE" + index}>
                {tds}
            </tr>
        );
    }

    private onDeleteClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        let tableIdToDelete = (event.target as HTMLButtonElement).id;
        console.log('Delete clicked for id' +  tableIdToDelete);
        
    }

    private handleDataSourceChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        this.props.loadTablesOfSelectedCatalog(event.target.value);
    } 
}

export default connect(mapStateToProps, mapDispatcherToProps)(TableMainComponent)