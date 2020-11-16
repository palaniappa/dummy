import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as asyncactions from '../../store/catalog/catalogAsyncActions';
import { CatalogActions } from '../../store/catalog/types';
import { ApplicationRootState } from '../../store/ApplicationState';
import  CreateCatalogComponent from './createCatalogComponent';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdbreact';
import { CatalogModel } from '../../models/catalog/CatalogModel';


const mapStateToProps = (state: ApplicationRootState) => {
    return {
        catalogs: state.catalog.catalogItems
    };
}

const mapDispatcherToProps = (dispatch: Dispatch<CatalogActions>) => {
    return {
        loadCatalogs: () => asyncactions.loadCatalogs(dispatch)
        , deleteCatalog:  (catalogId: string) => asyncactions.deleteCatalog(dispatch,catalogId)
    }
}

type ICatalogComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;


class CatalogComponent extends React.Component<ICatalogComponentProps, Object> {

    public componentDidMount() {
        this.props.loadCatalogs();
    }

    public render() {

        let catalogTable = this.getCatalogTable();
        return (
            <div style={{ margin: '20px' }}>
                <CreateCatalogComponent/>
                {catalogTable}                
            </div>
        );
    }

    private getColumnHeaders():JSX.Element  {
        
        let columns = ["","Id", "Name", "Data Source", "Properties"]

        let headers:Array<JSX.Element>  = [];
        columns.forEach( c => {
            let th = <th key={c}>{c}</th>
            headers.push(th);
        });

        return (
            <tr key={'catalog_headers'}>
                {headers}
            </tr>
        );
    }

    private getContents(): Array<JSX.Element> {
        
        let rows:Array<JSX.Element> = [];
        let index:number = 1;
        this.props.catalogs.items.forEach( r => {
            let row = <tr>{}</tr>
            rows.push(this.getRow(index, r));
            index++;
        })
        return rows;
    }

    private getRow(index:number, catalog: CatalogModel): JSX.Element {

        let deleteIcon = (<td><MDBIcon id={catalog.id} icon="trash-alt" onClick={this.onDeleteClick.bind(this)}/></td>);

        let tds: Array<JSX.Element> = [];
        tds.push(deleteIcon)
        tds.push(<td>{catalog.id}</td>);
        tds.push(<td>{catalog.name}</td>);
        tds.push(<td>{catalog.catalogType}</td>);
        tds.push(<td>{this.getProperties(catalog.properties)}</td>);

        return (
            <tr key={"CATALOG" + index}>
                {tds}
            </tr>
        );
    }

    private onDeleteClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        let catalogIdToDelete = (event.target as HTMLButtonElement).id;
        console.log('Delete clicked for id' +  catalogIdToDelete);
        this.props.deleteCatalog(catalogIdToDelete);
    }

    private getCatalogTable() {
        let headers = this.getColumnHeaders();
        let contents = this.getContents();
        return (
            <MDBTable striped bordered small scrollY maxHeight="500px">
                <caption>Catalogs</caption>
                <MDBTableHead color="primary-color" textWhite>
                    {headers}
                </MDBTableHead>
                <MDBTableBody>
                    {contents}
                </MDBTableBody>
            </MDBTable>
        );
    }

    private getProperties(props: { [name: string]: string }): Array<JSX.Element> {
        let displayItems: Array<JSX.Element> = [];

        Object.keys(props).forEach(k => {
            let item = (
                <div><span><b>{k + ':'}</b></span> <span><i>{props[k]}</i></span></div>
            );
            displayItems.push(item);
        });
        return displayItems;

    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(CatalogComponent);