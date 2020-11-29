import React from 'react';
import { ApplicationRootState } from '../../store/ApplicationState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { executeQuery } from '../../store/query/queryAsyncActions';
import { QueryActions } from '../../store/query/queryActions';
import QueryResultComponent from './queryResultComponent';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Alert } from 'react-bootstrap'
import styled from "styled-components";
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/sql/sql');
require('codemirror/mode/shell/shell');
require('codemirror/addon/display/placeholder');
require('codemirror/addon/hint/show-hint.css'); // Used for code hints
require('codemirror/addon/hint/show-hint.js'); // Used for code hints
require('codemirror/addon/hint/sql-hint.js');


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
        this.state = { modifiedSql: props.sqlQuery.toString() };
    }

    render() {

        let lastError = null;
        if (this.props.errorMessage) {
            lastError = (<Alert variant="danger">{this.props.errorMessage}</Alert>);
        }

        // let executeForm = (
        //     <form onSubmit={this.handleSubmit}>
        //         <fieldset disabled={this.props.executing === true}>
        //             <label>
        //                 Name:
        //                 <textarea id="sqlTextArea" className="form-control" rows={15}
        //                     name="querybox"
        //                     onChange={this.onQueryChange}
        //                     value={this.state.modifiedSql}
        //                     disabled={this.props.executing} />
        //             </label>

        //             <input type="submit" value="Execute" />

        //         </fieldset>
        //     </form>
        // );

        let executeForm = this.getForm();

        return (
            <MDBContainer fluid={true}>
                <MDBRow>
                    <MDBCol size="12">
                        <br></br>
                        <p className="h4 text-center mb-4">Interactive SQL</p>
                        {executeForm}
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>{lastError}</MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol size="12">
                        <QueryResultComponent />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );

    }

    private getForm() {
        const theme = {
            blue: {
                default: "#3f51b5",
                hover: "#283593"
            },
            pink: {
                default: "#e91e63",
                hover: "#ad1457"
            }
        };

        const Button = styled.button`
                        background-color: ${theme['blue'].default};
                        color: white;
                        padding: 5px 15px;
                        border-radius: 5px;
                        outline: 0;
                        text-transform: uppercase;
                        margin: 10px 0px;
                        cursor: pointer;
                        box-shadow: 0px 2px 2px lightgray;
                        transition: ease background-color 250ms;
                        &:hover {
                        background-color: ${theme['blue'].hover};
                        }
                        &:disabled {
                        cursor: default;
                        opacity: 0.7;
                        }
                        `;

        const codeMirronOptions = {
            mode: 'text/x-sql',
            indentWithTabs: true,
            smartIndent: true,
            lineNumbers: true,
            matchBrackets: true,
            autofocus: true,
            extraKeys: { Tab: 'autocomplete' },
            hintOptions: { completeSingle: false },
            lineWrapping: true,
            theme: 'default'
        };

        return (
            <MDBContainer fluid={true}>
                <MDBRow>
                    <MDBCol size="12">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset disabled={this.props.executing}>
                                <label htmlFor="sqlTextArea" className="grey-text">SQL</label>
                                {/* <textarea id="sqlTextArea" className="form-control" rows={9}
                        name="querybox"
                        onChange={this.onQueryChange}
                        value={this.state.modifiedSql}
                        disabled={this.props.executing} /> */}

                                <div style={{ fontSize: "large" }}>
                                    <CodeMirror
                                        value={this.state.modifiedSql}
                                        options={codeMirronOptions}
                                        onBeforeChange={(editor, data, value) => {
                                            this.setState({ ...this.state, modifiedSql: value });
                                        }}
                                        onChange={(editor, data, value) => {

                                        }}
                                    />
                                </div>
                                <br></br>
                                <div className="text-center">
                                    <Button type='submit'>Execute</Button>
                                </div>
                                <br></br>
                            </fieldset>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

    private onQueryChange(event: React.ChangeEvent) {
        let queryString = (event.target as HTMLTextAreaElement).value;
        this.setState({ modifiedSql: queryString });
    }

    private handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.executeQuery(this.state.modifiedSql);
    }

}


export default connect(mapStateToProps, mapDispatcherToProps)(QueryComponent); 