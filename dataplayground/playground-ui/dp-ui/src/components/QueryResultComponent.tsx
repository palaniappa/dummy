import React from 'react';
import { QueryResult } from "../models/QueryReuslt";
import { QueryResultRecord } from '../models/QueryResultRecord';


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
                Here is the result table showing {this.props.result.recordCount}
                <table>
                    <thead>
                        {headers}
                    </thead>
                    <tbody>
                        {contents}
                    </tbody>
                </table>
            </div>
        )
    }

    private getColumnHeaders():JSX.Element  {
         
        let headers:Array<JSX.Element>  = [];
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
        this.props.result.records.forEach( r => {
        let row = <tr>{}</tr>
            rows.push(this.getRow(r));
        })
        return rows;
    }

    private getRow(row: QueryResultRecord): JSX.Element {
        let tds: Array<JSX.Element> = [];
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