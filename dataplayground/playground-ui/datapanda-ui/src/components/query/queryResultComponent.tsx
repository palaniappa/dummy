import React from 'react';
import { ApplicationRootState } from '../../store/ApplicationState';
import { Dispatch } from 'react';
import { QueryActions } from '../../store/query/queryActions';
import { connect } from 'react-redux';
import { QueryResult,  } from '../../models/query/QueryReuslt';
import { QueryResultRecord } from '../../models/query/QueryResultRecord';

interface IQueryResultComponentStateProps {
    queryResult?: QueryResult
}

const mapStateToProps = (state: ApplicationRootState): IQueryResultComponentProps => {
    return {
        queryResult: state.query.queryResult
    };
}

const mapDispatcherToProps = (dispatch : Dispatch<QueryActions>) => {
    return {};
}

type IQueryResultComponentProps = IQueryResultComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

class QueryResultComponent extends React.Component<IQueryResultComponentProps, Object> {

    constructor(props:IQueryResultComponentProps) {
        super(props);
    }
    render() {

        let table = this.getResultTable();

        return (
            <div style={{ margin: '20px' }}>
                <h2>Query Result:</h2>
                {table}
            </div>
        );
    }

    private getResultTable() {
        if(this.props.queryResult){
            let headers = this.getColumnHeaders();

            let contents = this.getContents();

            return (
                <div>
                    <span>Record Count {this.props.queryResult.recordCount}</span>
                    <table>
                        <thead>
                            {headers}
                        </thead>
                        <tbody>
                            {contents}
                        </tbody>
                    </table>
                </div>
            );
        }
        return (
            <span>No results to populate</span>
        );
        
    }

    private getColumnHeaders():JSX.Element  {
        if(!this.props.queryResult)
            throw new Error("Query Result can't be empty");

        let headers:Array<JSX.Element>  = [];
        let rowCount = <th>#</th>;
        headers.push(rowCount);
        this.props.queryResult.columns.forEach( c => {
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
        if(!this.props.queryResult)
            throw new Error("Query Result can't be empty");
        
        let rows:Array<JSX.Element> = [];
        let index:number = 1;
        this.props.queryResult.records.forEach( r => {
        let row = <tr>{}</tr>
            rows.push(this.getRow(index, r));
            index++;
        })
        return rows;
    }

    private getRow(index:number, row: QueryResultRecord): JSX.Element {
        if(!this.props.queryResult)
            throw new Error("Query Result can't be empty");
        

        let tds: Array<JSX.Element> = [];
        tds.push(<td>{index}</td>);
        this.props.queryResult.columns.forEach( c => {
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

export default connect(mapStateToProps,mapDispatcherToProps)(QueryResultComponent);