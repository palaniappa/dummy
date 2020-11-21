import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationRootState } from '../../store/ApplicationState';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { FieldType, TableDetails, TableField } from '../../models/table/TableDetails';
import { PlaygroundButton } from '../componentConstants';
import { TableActions } from '../../store/table/tableActions';
import { createTable } from '../../store/table/tableAsyncActions';

interface ICreateTableComponentStateProps {
    selectedCatalogId: string;
}

const mapStateToProps = (state:ApplicationRootState) : ICreateTableComponentStateProps  => {
    return {
        selectedCatalogId: state.table.selectedDataSource
    };
}

const mapDispatcherToProps = (dispatch : Dispatch<TableActions>) => {
    return {
        createTable: (table: TableDetails) => createTable(dispatch,table)
    };
}

type ICreateTableComponentProps = ICreateTableComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

interface ICreateTableComponentLocalState {
    fieldList: string;
    tableBeingCreated: TableDetails;
    currentFieldName: string;
    currentFieldType: FieldType;
}

class CreateTableComponent extends React.Component<ICreateTableComponentProps, ICreateTableComponentLocalState> {

    constructor(props: ICreateTableComponentProps) {
        super(props);

        this.state = this.getInitialState(props.selectedCatalogId);
    }

    private getInitialState(currentCatalogId: string) {
        let tableBeingCreated: TableDetails = {
            tableName: ""
            , catalogId: currentCatalogId
            , locationPath: ""
            , databaseName: ""
            , fields: []
        };

        let initState: ICreateTableComponentLocalState = {
            fieldList:"", tableBeingCreated: tableBeingCreated, currentFieldName:"", currentFieldType: FieldType.TEXT
        };
        return initState;
    }

    render() {
        
        let fielTypeValues: Array<JSX.Element> = [];
        fielTypeValues.push(<option value={FieldType.TEXT}>{FieldType.TEXT}</option>);
        fielTypeValues.push(<option value={FieldType.NUMBER}>{FieldType.NUMBER}</option>);
        fielTypeValues.push(<option value={FieldType.DATE}>{FieldType.DATE}</option>);
        fielTypeValues.push(<option value={FieldType.DATETIME}>{FieldType.DATETIME}</option>);

        let fields: Array<JSX.Element> = this.getFields();

        let createDisabled = this.props.selectedCatalogId === "NONE";

        return (
        <MDBContainer fluid={true}>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset disabled={createDisabled}>
                    <MDBRow>
                        <MDBCol>
                            <label htmlFor="tableNameId" className="grey-text">Table Name</label>
                            <input type="text" id="tableNameId" className="form-control"
                                value={this.state.tableBeingCreated.tableName}
                                onChange={this.onValueChange.bind(this)}
                            />
                            <br />

                            <label htmlFor="locationpathId" className="grey-text">Location Path</label>
                            <input type="text" id="locationpathId" className="form-control"
                                value={this.state.tableBeingCreated.locationPath}
                                onChange={this.onValueChange.bind(this)}
                            />
                            <br />

                            <label htmlFor="fieldListId" className="grey-text">Field List</label>
                            <textarea rows={5} id="fieldListId" className="form-control"
                                value={this.state.fieldList}
                                onChange={this.onValueChange.bind(this)}
                            />
                            <br />
                            <MDBTable hover bordered small scrollY maxHeight="500px">
                                <MDBTableHead color="primary-color" textWhite>
                                    <tr>
                                        <th>Field Name</th>
                                        <th>Field Type</th>
                                        <th></th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {fields}
                                    <tr key={"addfieldssrow"}>
                                        <td>
                                            <input type="text" id="fieldNameId" className="form-control"
                                                value={this.state.currentFieldName}
                                                onChange={this.onFieldNameChange.bind(this)}
                                            />
                                        </td>
                                        <td>
                                            <select id="fieldTypeId" className="browser-default custom-select" 
                                                value={this.state.currentFieldType}
                                                onChange={this.onFieldTypeChange.bind(this)}>
                                                {fielTypeValues}
                                            </select>
                                        </td>

                                        <td align="center" valign="middle">
                                            <MDBIcon icon="plus" onClick={this.onAddFieldClick.bind(this)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} align="center">
                                            <PlaygroundButton onClick={this.onAddFieldClick.bind(this)}>Add Field</PlaygroundButton>
                                        </td>
                                    </tr>

                                </MDBTableBody>
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                    <br />
                    <div className="text-center">
                        <PlaygroundButton type='submit'>Create</PlaygroundButton>
                    </div>
                    <br />
                </fieldset>
            </form>
        </MDBContainer>);
    }

    private onValueChange(event: React.ChangeEvent) {
        let textElement = event.target as HTMLInputElement;
        if(textElement.id == "tableNameId") {
            let tableBeingCreated = { ...this.state.tableBeingCreated, tableName: textElement.value };
            this.setState({...this.state, tableBeingCreated: tableBeingCreated });
        }
        else if(textElement.id == "locationpathId") {
            let tableBeingCreated = { ...this.state.tableBeingCreated, locationPath: textElement.value };
            this.setState({...this.state, tableBeingCreated: tableBeingCreated });
        } else if(textElement.id == "fieldListId") {
            let fields = this.getUpdatedFieldList(textElement.value);
            let tableBeingCreated = {...this.state.tableBeingCreated, fields: fields }
            this.setState({...this.state, fieldList: textElement.value, tableBeingCreated: tableBeingCreated });
        }
    }

    private onFieldNameChange( event: React.ChangeEvent) {
        let textElement = event.target as HTMLInputElement;
        this.setState({...this.state, currentFieldName: textElement.value});
    }

    private onFieldTypeChange( event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({...this.state, currentFieldType: event.target.value as FieldType});

    }

    private onAddFieldClick( event: React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        let newField =  { fieldName: this.state.currentFieldName, fieldType: this.state.currentFieldType };
        let tableBeingCreated = {...this.state.tableBeingCreated, fields: this.state.tableBeingCreated.fields.concat(newField) }
        let fieldListString = this.getUpdatedFieldListString(tableBeingCreated.fields);
        this.setState({...this.state,tableBeingCreated: tableBeingCreated, currentFieldName: "", currentFieldType: FieldType.TEXT, fieldList: fieldListString});
    }

    private onDeleteFieldClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        let index = Number((event.target as HTMLButtonElement).id);
        let tableBeingCreated = {...this.state.tableBeingCreated, fields: this.state.tableBeingCreated.fields.slice(0, index)
            .concat(this.state.tableBeingCreated.fields.slice(index + 1, this.state.tableBeingCreated.fields.length))};
            let fieldListString = this.getUpdatedFieldListString(tableBeingCreated.fields);
        this.setState({...this.state,tableBeingCreated: tableBeingCreated, fieldList: fieldListString});
    }

    private getUpdatedFieldList(fieldListString: string): Array<TableField> {
        let newFields: Array<TableField> = [];
        if(fieldListString) {
            let fieldItems = fieldListString.split(",");
            fieldItems.forEach( fieldItem => {
                let tokens = fieldItem.split(":");
                if(tokens.length == 2) {
                    let fieldName: string = tokens[0];
                    let fieldType = tokens[1] as FieldType;
                    newFields.push({ fieldName: fieldName, fieldType: fieldType});
                }
            });
        }
        return newFields;
    }

    private getUpdatedFieldListString(fields: Array<TableField>): string { 
        let fieldListString = "";
        if(fields) {
            fields.forEach( f => {
                let fieldStringRep = f.fieldName + ':' + f.fieldType;
                if(fieldListString != "")
                    fieldListString = fieldListString + ",";
                fieldListString = fieldListString + fieldStringRep;
            });
        }
        return fieldListString;
    }

    private getFields(): Array<JSX.Element> {
        let fieldcontrols:Array<JSX.Element> = [];
        let index = 0;
        this.state.tableBeingCreated.fields.forEach( f => {
            let deleteIcon = (<MDBIcon id={index} icon="trash-alt" onClick={this.onDeleteFieldClick.bind(this)}/>);
            let row = (
                <tr key={'tbl_field_' + index}>
                    <td>
                        {f.fieldName}
                    </td>
                    <td>
                        {f.fieldType}
                    </td>
                    <td align="center" valign="middle">
                        {deleteIcon}
                    </td>
                </tr>
            );
            fieldcontrols.push(row);
            index++;
        });
        return fieldcontrols;
    }

    private handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.createTable(this.state.tableBeingCreated).then( () => {
            this.setState(this.getInitialState(this.props.selectedCatalogId));
        });
    }

}

export default connect(mapStateToProps, mapDispatcherToProps)(CreateTableComponent);