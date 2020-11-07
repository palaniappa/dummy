import React from 'react';
import { QueryResult } from "../models/QueryReuslt";
import { QueryResultRecord } from '../models/QueryResultRecord';
import Table from 'react-bootstrap/Table';


export interface IQueryResultComponentProps {
    result: QueryResult
}

export interface IQueryResultComponentState {

}

export class QueryResultComponent extends React.Component<IQueryResultComponentProps,IQueryResultComponentState> {

    constructor(props:IQueryResultComponentProps) {
        super(props);
        
    }

    render(): React.ReactNode {
        let headers = this.getColumnHeaders();

        let contents = this.getContents();

        return (
            <div>
                <span>Record Count {this.props.result.recordCount}</span>
                <Table striped bordered hover size="sm" responsive="sm">
                    <thead>
                        {headers}
                    </thead>
                    <tbody>
                        {contents}
                    </tbody>
                </Table>
            </div>
        )
    }

    private getColumnHeaders():JSX.Element  {
         
        let headers:Array<JSX.Element>  = [];
        let rowCount = <th>#</th>;
        headers.push(rowCount);
        this.props.result.columns.forEach( c => {
            let th = <th>{c.columnLabel}</th>
            headers.push(th);
        });

        return (
            <tr>
                {headers}
            </tr>
        );
    }

    private getContents(): Array<JSX.Element> {
        let rows:Array<JSX.Element> = [];
        let index:number = 1;
        this.props.result.records.forEach( r => {
        let row = <tr>{}</tr>
            rows.push(this.getRow(index, r));
            index++;
        })
        return rows;
    }

    private getRow(index:number, row: QueryResultRecord): JSX.Element {
        let tds: Array<JSX.Element> = [];
        tds.push(<td>{index}</td>);
        this.props.result.columns.forEach( c => {
            let data = "";
            if(row[c.columnLabel]) {
                data = row[c.columnLabel].toString();
            }
            let td = ( <td> {data} </td>);
            tds.push(td);
        });

        return (
            <tr>
                {tds}
            </tr>
        );
    }
}