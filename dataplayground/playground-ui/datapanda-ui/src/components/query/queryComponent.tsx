import React from 'react';
import { ApplicationRootState } from '../../store/ApplicationState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { executeQuery } from '../../store/query/queryAsyncActions';
import { QueryActions } from '../../store/query/queryActions';
import QueryResultComponent from './queryResultComponent';

interface IQueryComponentStateProps {
    executing: boolean
    , sqlQuery: String
    , errorMessage?: String
}

const mapStateToProps = (state: ApplicationRootState) => {

    return {
        executing: state.query.executing
        , sqlQuery: state.query.sqlQuery
        , errorMessage: state.query.errorMessage
    };

}

const mapDispatcherToProps = (dispatch: Dispatch<QueryActions>) => {
    return {
        executeQuery: (sqlQuery: String) => executeQuery(dispatch, sqlQuery)
    }
}

type IQueryComponentProps = IQueryComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

interface IQueryComponentLocalState {
    modifiedSql: string;
}

class QueryComponent extends React.Component<IQueryComponentProps, IQueryComponentLocalState> {

    constructor(props: IQueryComponentProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onQueryChange = this.onQueryChange.bind(this);
        this.state = { modifiedSql: props.sqlQuery.toString()};
    }

    render() {

        let lastError = null;
        if (this.props.errorMessage) {
            lastError = <div>Error {this.props.errorMessage}</div>
        }

        let executeForm = (
            <form onSubmit={this.handleSubmit}>
                <fieldset disabled={this.props.executing === true}>
                    <label>
                        Name:
                        <textarea id="sqlTextArea" className="form-control" rows={15} 
                        name="querybox" 
                        onChange={this.onQueryChange} 
                        value={this.state.modifiedSql}
                        disabled={this.props.executing}/> 
                    </label>
                    
                        <input type="submit" value="Execute" />
                    
                </fieldset>
            </form>
        );

        return (
            <div style={{ margin: '20px' }}>
                <h2>Interactive SQL</h2>
                {lastError}
                {executeForm}
                <QueryResultComponent/>
            </div>
        );

    }

    private onQueryChange(event: React.ChangeEvent ) {
        let queryString = (event.target as HTMLTextAreaElement).value;
        this.setState({modifiedSql: queryString});
    }

    private handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.executeQuery(this.state.modifiedSql);
    }

}


export default connect(mapStateToProps, mapDispatcherToProps)(QueryComponent); 