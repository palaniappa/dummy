import React from "react"

export interface IQueryComponentProps {
    execute: (query: string) => void,
    sqlQuery: string,
    executing: boolean
}

export interface IQueryComponentState {
    sqlQuery: string
}

export class QueryComponent extends React.Component<IQueryComponentProps,IQueryComponentState> {
    constructor(props: IQueryComponentProps) {
        super(props);
        this.state = { sqlQuery: props.sqlQuery };
    }

    render() {
        return (
            <div>
                <br></br>
                <textarea name="querybox" onChange={this.onQueryChange.bind(this)} value={this.state.sqlQuery} disabled={this.props.executing}/> 
                <br></br>
                <button onClick={this.onExecuteClick.bind(this)} disabled={this.props.executing} >Execute</button>
            </div>
        );
    }

    onQueryChange(event: React.ChangeEvent ) {
        let queryString = (event.target as HTMLTextAreaElement).value;
        this.setState({sqlQuery: queryString});
    }

    onExecuteClick() {
        this.setState({sqlQuery: this.state.sqlQuery})
        this.props.execute(this.state.sqlQuery);
    }
}