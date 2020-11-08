import React from 'react';
import { CatalogModel } from '../../models/catalog/CatalogModel';
import { Row, Table, Container } from 'react-bootstrap';
import { FetchState } from '../../models/FetchState';
import { ICatalogComponentState } from '../state/PlayGroundState';


export interface ICatalogComponentProps {
    context: ICatalogComponentState;
}



export class CatalogComponent extends React.Component<ICatalogComponentProps, ICatalogComponentState> {

    constructor(props: ICatalogComponentProps) {
        super(props);
    }

    render(): React.ReactNode {
        let table = this.renderCatalogItems();
        return (
            <div>
                <br></br>
                <Container fluid={true}>
                    <Row>
                        <h1>Catalogs:</h1>
                    </Row>
                    <Row>
                        {table}
                    </Row>
                    <Row>
                        
                    </Row>
                </Container>
            </div>
        );
    }

    renderCatalogItems(): JSX.Element {

        let headers = ["Id", "Name", "Type", "Connector Id", "Properties"];

        let headerComps: Array<JSX.Element> = [];
        headers.forEach(h => {
            let th = <th>{h}</th>;
            headerComps.push(th);
        });

        let contents: Array<JSX.Element> = [];
        if(this.props.context.items){
            this.props.context.items.forEach(c => {
                let row = (
                    <tr>
                        <td>
                            {c.id}
                        </td>
                        <td>
                            {c.name}
                        </td>
                        <td>
                            {c.catalogType}
                        </td>
                        <td>
                            {c.connectorId}
                        </td>
                        <td>
                            {this.getProperties(c.properties)}
                        </td>
                    </tr>
                );
    
                contents.push(row);
            });
        }

        return (
            <Table striped bordered hover size="sm" responsive="sm">
                <thead>
                    {headerComps}
                </thead>
                <tbody>
                    {contents}
                </tbody>
            </Table>
        );
    }

    private getProperties(props: { [name: string]: string }): Array<JSX.Element> {
        let displayItems: Array<JSX.Element> = [];

        Object.keys(props).forEach(k => {
            let item = (
                <div><span>{k}</span> <span><i>{props[k]}</i></span></div>
            );
            displayItems.push(item);
        });
        return displayItems;

    }
}