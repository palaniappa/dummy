import React from 'react';
import { ApplicationRootState } from '../../store/ApplicationState';
import { Dispatch } from 'react';
import { QueryActions } from '../../store/query/queryActions';
import { connect } from 'react-redux';
import { QueryResult,  } from '../../models/query/QueryReuslt';
import { QueryResultRecord } from '../../models/query/QueryResultRecord';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

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
            <div>
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
                    <MDBTable striped bordered small scrollY maxHeight="500px">
                        <caption>Records {this.props.queryResult.recordCount} </caption>
                        <MDBTableHead color="primary-color" textWhite>
                            {headers}
                        </MDBTableHead>
                        <MDBTableBody>
                            {contents}
                        </MDBTableBody>
                    </MDBTable>
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
            let th = <th key={c.columnLabel}>{c.columnLabel}</th>
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
            <tr key={"Q_R" + index}>
                {tds}
            </tr>
        );
    }
}

export default connect(mapStateToProps,mapDispatcherToProps)(QueryResultComponent);