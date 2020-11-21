import { type } from 'os';
import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationRootState } from '../../store/ApplicationState';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { CatalogModel } from '../../models/catalog/CatalogModel';
import { CatalogActions } from '../../store/catalog/types';
import * as asyncactions from '../../store/catalog/catalogAsyncActions';
import { loadTablesOfSelectedCatalog, loadTableDetails } from '../../store/table/tableAsyncActions';
import { TableActions } from '../../store/table/tableActions';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdbreact';
import { CatalogTable, CatalogTables } from '../../models/catalog/CatalogTables';
import { parseConfigFileTextToJson } from 'typescript';
import { TableDetails } from '../../models/table/TableDetails';
import { stat } from 'fs';
import { create } from 'domain';

interface ITableMainComponentStateProps {
    catalogs: Array<CatalogModel>;
    catalogTables?: CatalogTables;
    selectedDataSource: string;
    selectedTableId: string;
    tableDetails?: TableDetails;
}

const mapStateToProps = (state: ApplicationRootState): ITableMainComponentStateProps => {
    return {
        catalogs: state.catalog.catalogItems.items
        , catalogTables: state.table.catalogTables
        , selectedDataSource: state.table.selectedDataSource
        , selectedTableId: state.table.selectedTableId
        , tableDetails: state.table.tableDetails
    };
}

const mapDispatcherToProps = (dispatch: Dispatch<CatalogActions|TableActions>) => {
    return {
        loadCatalogs: () => asyncactions.loadCatalogs(dispatch)
        , loadTablesOfSelectedCatalog: (selectedCatalogId: string) => loadTablesOfSelectedCatalog(dispatch, selectedCatalogId)
        , loadTableDetails: (selectedTableId: string) => loadTableDetails(dispatch, selectedTableId)
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

        let tableDetails = this.getTableTableDetailsPane();

        let createTable = <div>Create Table Section</div>

        return (
            <MDBContainer fluid={true}>
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
                                <MDBContainer>
                                    {tableDetails}
                                </MDBContainer>
                                <MDBContainer>
                                    {createTable}
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

    private getTableTableDetailsPane(): JSX.Element {
        if(!this.props.tableDetails) {
            return (<span>Select a table to see the details.</span>)
        }
        let fields: Array<JSX.Element> = [];
        this.props.tableDetails.fields.forEach( f => {
            let row = (
                <tr>
                    <td>
                        {f.fieldName}
                    </td>
                    <td>
                        {f.fieldType}
                    </td>
                </tr>
            )
            fields.push(row);
        });
        return (<div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol>
                        <MDBTable>
                            <MDBTableBody>
                                <tr>
                                    <td><b>Table Name</b></td>
                                    <td>{this.props.tableDetails.tableName}</td>
                                    <td><b>Database Name</b></td>
                                    <td>{this.props.tableDetails.databaseName}</td>
                                </tr>
                                <tr>
                                    <td><b>Location Path</b></td>
                                    <td>{this.props.tableDetails.locationPath}</td>
                                    <td><b></b></td>
                                    <td></td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBTable hover striped bordered small scrollY maxHeight="500px">
                            <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                    <th>Field Name</th>
                                    <th>Field Type</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {fields}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>);
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
        let columns = ["","Name"]

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
            <MDBTable hover striped bordered small scrollY maxHeight="500px">
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
                rows.push(this.getRow(index, r));
                index++;
            })
        }
        return rows;
    }

    private getRow(index:number, catalogTable: CatalogTable): JSX.Element {

        let deleteIcon = (<MDBIcon id={catalogTable.tableId} icon="trash-alt" onClick={this.onDeleteClick.bind(this)}/>);
        
        let tds: Array<JSX.Element> = [];
        tds.push(<td align={"center"}>{deleteIcon}</td>)
        if(catalogTable.tableId == this.props.selectedTableId) {
            tds.push(<td id={catalogTable.tableId} onClick={this.onTableSelect.bind(this)}>{catalogTable.tableName}</td>);
        }
        else {
            tds.push(<td id={catalogTable.tableId} onClick={this.onTableSelect.bind(this)}>{catalogTable.tableName}</td>);
        }

        let tr = undefined;
        if(catalogTable.tableId == this.props.selectedTableId) {
            tr = (<tr style ={{backgroundColor:"antiquewhite"}} key={"CATALOG_TABLE" + index}>
                    {tds}
                </tr>);
        }
        else {
            tr = (<tr key={"CATALOG_TABLE" + index}>
                    {tds}
                </tr>);
        }

        return tr;
    }

    private onTableSelect(event: React.MouseEvent<HTMLTableDataCellElement,MouseEvent>) {
        let td = event.target as HTMLTableDataCellElement;
        let selectedTableId: string = td.id;
        this.props.loadTableDetails(selectedTableId)
        console.log("Table selected {} " + selectedTableId);
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