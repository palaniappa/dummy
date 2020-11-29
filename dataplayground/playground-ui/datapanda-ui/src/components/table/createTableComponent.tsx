import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationRootState } from '../../store/ApplicationState';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { FieldType, TableDetails, TableField } from '../../models/table/TableDetails';
import { TableActions } from '../../store/table/tableActions';
import { analyzeTableSchema, createTable } from '../../store/table/tableAsyncActions';
import { Button, Alert } from 'react-bootstrap';
import { TableSchema } from '../../models/table/TableSchema';
import { CatalogType } from '../../models/catalog/CatalogType';

interface ICreateTableComponentStateProps {
    selectedCatalogId: string;
    selectedCatalogType: CatalogType;
}

const mapStateToProps = (state: ApplicationRootState): ICreateTableComponentStateProps => {
    let selectedCatalogType = CatalogType.S3;
    if (state.table.selectedDataSource !== "NONE" && state.catalog.catalogItems.items) {
        state.catalog.catalogItems.items.forEach(c => {
            if (c.id == state.table.selectedDataSource) {
                selectedCatalogType = c.catalogType;
            }
        });
    }
    return {
        selectedCatalogId: state.table.selectedDataSource
        , selectedCatalogType: selectedCatalogType
    };
}

const mapDispatcherToProps = (dispatch: Dispatch<TableActions>) => {
    return {
        createTable: (table: TableDetails) => createTable(dispatch, table)
        , analyzeTableSchema: (catalogId: string, tableNameOrLocationPath: string) => analyzeTableSchema(dispatch, catalogId, tableNameOrLocationPath)
    };
}

type ICreateTableComponentProps = ICreateTableComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

interface ICreateTableComponentLocalState {
    fieldList: string;
    tableBeingCreated: TableDetails;
    currentFieldName: string;
    currentFieldType: FieldType;
    analyzeSchemaError?: string;
    schewmaResult?: TableSchema;
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
            fieldList: "", tableBeingCreated: tableBeingCreated, currentFieldName: ""
            , currentFieldType: FieldType.TEXT
            , analyzeSchemaError: undefined
            , schewmaResult: undefined
        };
        return initState;
    }

    render() {

        let lastError = null;
        if (this.state.analyzeSchemaError) {
            lastError = (<Alert variant="danger">{this.state.analyzeSchemaError}</Alert>);
        }

        let fieldTypeValues: Array<JSX.Element> = [];
        fieldTypeValues.push(<option value={FieldType.TEXT}>{FieldType.TEXT}</option>);
        fieldTypeValues.push(<option value={FieldType.NUMBER}>{FieldType.NUMBER}</option>);
        fieldTypeValues.push(<option value={FieldType.DATE}>{FieldType.DATE}</option>);
        fieldTypeValues.push(<option value={FieldType.DATETIME}>{FieldType.DATETIME}</option>);

        let fields: Array<JSX.Element> = this.getFields(fieldTypeValues);
        let sampleData = this.getSampleData();
        let createDisabled = this.props.selectedCatalogId === "NONE";

        let locationPath = undefined;
        let addFieldControls = [];
        if (this.props.selectedCatalogType == CatalogType.S3) {
            locationPath = (
                <div>
                    <label htmlFor="locationpathId" className="grey-text">Location Path</label>
                    <input type="text" id="locationpathId" className="form-control"
                        value={this.state.tableBeingCreated.locationPath}
                        onChange={this.onValueChange.bind(this)}
                    />
                    <br />
                </div>
            );

            addFieldControls.push(
                <tr key={"addfieldssrow"}>
                    <td>
                        <input type="text" id="fieldNameId" className="form-control"
                            value={this.state.currentFieldName}
                            onChange={this.onFieldNameChange.bind(this)}
                        />
                    </td>
                    <td>
                        <select id="fieldtypeid" className="browser-default custom-select"
                            value={this.state.currentFieldType}
                            onChange={this.onFieldTypeChange.bind(this)}>
                            {fieldTypeValues}
                        </select>
                    </td>

                    <td align="center" valign="middle">
                        <MDBIcon icon="plus" onClick={this.onAddFieldClick.bind(this)} />
                    </td>
                </tr>);
            addFieldControls.push(
                <tr>
                    <td colSpan={3} align="center">
                        <Button size="sm" onClick={this.onAddFieldClick.bind(this)}>Add Field</Button>
                    </td>
                </tr>);
        }

        return (
            <MDBContainer fluid={true}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset disabled={createDisabled}>
                        <MDBRow>
                            <MDBCol>
                                {lastError}

                                <label htmlFor="tableNameId" className="grey-text">Table Name</label>
                                <input type="text" id="tableNameId" className="form-control"
                                    value={this.state.tableBeingCreated.tableName}
                                    onChange={this.onValueChange.bind(this)}
                                />
                                <br />

                                {locationPath}

                                <Button variant="primary" size="sm"
                                    onClick={this.onAnalyzeSchemaClick.bind(this)}
                                    disabled=
                                    {
                                        (this.props.selectedCatalogType === CatalogType.S3 && this.state.tableBeingCreated.locationPath === "")
                                        || (this.props.selectedCatalogType === CatalogType.PostgreSQL && this.state.tableBeingCreated.tableName === "")
                                    }
                                >
                                    Analyze Schema
                            </Button>
                                <br />
                                <br />

                                {sampleData}

                                <div style={{ display: "none" }}>
                                    <label htmlFor="fieldListId" className="grey-text">Field List</label>
                                    <textarea rows={5} id="fieldListId" className="form-control"
                                        value={this.state.fieldList}
                                        onChange={this.onValueChange.bind(this)}
                                    />
                                    <br />
                                </div>


                                <label htmlFor="tableFieldList" className="grey-text">Fields</label>
                                <MDBTable hover bordered small scrollY maxHeight="500px" id="tableFieldList">
                                    <MDBTableHead color="primary-color" textWhite>
                                        <tr>
                                            <th>Field Name</th>
                                            <th>Field Type</th>
                                            <th></th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {fields}
                                        {addFieldControls}

                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCol>
                        </MDBRow>
                        <br />
                        <div className="text-center">
                            <Button type='submit'>Add Table</Button>
                        </div>
                        <br />
                    </fieldset>
                </form>
            </MDBContainer>);
    }

    private getSampleData(): JSX.Element {
        if (!this.state.schewmaResult || !this.state.schewmaResult.samplesRows)
            return (<div></div>);

        let headers: Array<JSX.Element> = [];
        this.state.schewmaResult.fields.forEach(c => {
            let th = <th key={c.fieldName}>{c.fieldName}</th>
            headers.push(th);
        });

        let rows: Array<JSX.Element> = [];
        let index: number = 1;
        this.state.schewmaResult.samplesRows.forEach(r => {
            let tds: Array<JSX.Element> = [];
            r.forEach(sampleData => {
                tds.push(<td>{sampleData}</td>);
            });
            let row = <tr key={"sampleData" + index}>{tds}</tr>
            rows.push(row);
            index++;
        })

        return (
            <div style={{ maxWidth: "100%" }}>
                <label htmlFor="sampleDataTable" className="grey-text">Sample Data</label>
                <MDBTable id="sampleDataTable" bordered small={true} scrollY maxHeight="250px">
                    <MDBTableHead color="primary-color" textWhite>
                        {headers}
                    </MDBTableHead>
                    <MDBTableBody>
                        {rows}
                    </MDBTableBody>
                </MDBTable>
                <br />
            </div>
        )
    }

    private onAnalyzeSchemaClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.preventDefault();
        console.log("Analyze clicked..!");
        let tableNameOrLocationPath = this.props.selectedCatalogType === CatalogType.S3 ? this.state.tableBeingCreated.locationPath : this.state.tableBeingCreated.tableName;
        this.props.analyzeTableSchema(this.props.selectedCatalogId, tableNameOrLocationPath).then((schemaResult: void | TableSchema) => {
            if (schemaResult) {
                if (schemaResult.resultMessage) {
                    this.setState({ ...this.state, analyzeSchemaError: schemaResult.resultMessage, schewmaResult: undefined });
                }
                else {
                    let tableBeingCreated = {
                        ...this.state.tableBeingCreated
                        , fields: schemaResult.fields
                    }
                    let fieldListString = this.getUpdatedFieldListString(tableBeingCreated.fields);
                    this.setState({
                        ...this.state, tableBeingCreated: tableBeingCreated, currentFieldName: ""
                        , currentFieldType: FieldType.TEXT
                        , fieldList: fieldListString
                        , analyzeSchemaError: undefined
                        , schewmaResult: schemaResult
                    });
                }
            }
            else {
                this.setState({ ...this.state, analyzeSchemaError: "Failed to analyze the schema, try again." });
            }
        });
    }

    private onValueChange(event: React.ChangeEvent) {
        let textElement = event.target as HTMLInputElement;
        if (textElement.id === "tableNameId") {
            let tableBeingCreated = { ...this.state.tableBeingCreated, tableName: textElement.value };
            this.setState({ ...this.state, tableBeingCreated: tableBeingCreated });
        }
        else if (textElement.id === "locationpathId") {
            let tableBeingCreated = { ...this.state.tableBeingCreated, locationPath: textElement.value };
            this.setState({ ...this.state, tableBeingCreated: tableBeingCreated });
        } else if (textElement.id === "fieldListId") {
            let fields = this.getUpdatedFieldList(textElement.value);
            let tableBeingCreated = { ...this.state.tableBeingCreated, fields: fields }
            this.setState({ ...this.state, fieldList: textElement.value, tableBeingCreated: tableBeingCreated });
        }
    }

    private onFieldNameChange(event: React.ChangeEvent) {
        let textElement = event.target as HTMLInputElement;
        if (textElement.id == "fieldNameId") {
            this.setState({ ...this.state, currentFieldName: textElement.value });
        } else {
            let idx = Number(event.target.id.replace("fieldNameId_", ""));
            let tableField: TableField = this.state.tableBeingCreated.fields[idx];
            let modifiedField: TableField = { ...tableField, fieldName: textElement.value };

            let tableBeingCreated = {
                ...this.state.tableBeingCreated
                , fields: this.state.tableBeingCreated.fields.slice(0, idx)
                    .concat(modifiedField)
                    .concat(this.state.tableBeingCreated.fields.slice(idx + 1, this.state.tableBeingCreated.fields.length))
            };

            let fieldListString = this.getUpdatedFieldListString(tableBeingCreated.fields);
            this.setState({ ...this.state, tableBeingCreated: tableBeingCreated, fieldList: fieldListString });
        }

    }

    private onFieldTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.id === "fieldtypeid")
            this.setState({ ...this.state, currentFieldType: event.target.value as FieldType });
        else {
            let idx = Number(event.target.id.replace("fieldtypeid_", ""));
            let tableField: TableField = this.state.tableBeingCreated.fields[idx];
            let modifiedField: TableField = { ...tableField, fieldType: event.target.value as FieldType };

            let tableBeingCreated = {
                ...this.state.tableBeingCreated
                , fields: this.state.tableBeingCreated.fields.slice(0, idx)
                    .concat(modifiedField)
                    .concat(this.state.tableBeingCreated.fields.slice(idx + 1, this.state.tableBeingCreated.fields.length))
            };

            let fieldListString = this.getUpdatedFieldListString(tableBeingCreated.fields);
            this.setState({ ...this.state, tableBeingCreated: tableBeingCreated, fieldList: fieldListString });
        }

    }

    private onAddFieldClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.SyntheticEvent<HTMLButtonElement, Event>) {
        event.preventDefault();
        let newField = { fieldName: this.state.currentFieldName, fieldType: this.state.currentFieldType };
        let tableBeingCreated = { ...this.state.tableBeingCreated, fields: this.state.tableBeingCreated.fields.concat(newField) }
        let fieldListString = this.getUpdatedFieldListString(tableBeingCreated.fields);
        this.setState({ ...this.state, tableBeingCreated: tableBeingCreated, currentFieldName: "", currentFieldType: FieldType.TEXT, fieldList: fieldListString });
    }

    private onDeleteFieldClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        let index = Number((event.target as HTMLButtonElement).id);
        let tableBeingCreated = {
            ...this.state.tableBeingCreated, fields: this.state.tableBeingCreated.fields.slice(0, index)
                .concat(this.state.tableBeingCreated.fields.slice(index + 1, this.state.tableBeingCreated.fields.length))
        };
        let fieldListString = this.getUpdatedFieldListString(tableBeingCreated.fields);
        this.setState({ ...this.state, tableBeingCreated: tableBeingCreated, fieldList: fieldListString });
    }

    private getUpdatedFieldList(fieldListString: string): Array<TableField> {
        let newFields: Array<TableField> = [];
        if (fieldListString) {
            let fieldItems = fieldListString.split(",");
            fieldItems.forEach(fieldItem => {
                let tokens = fieldItem.split(":");
                if (tokens.length === 2) {
                    let fieldName: string = tokens[0];
                    let fieldType = tokens[1] as FieldType;
                    newFields.push({ fieldName: fieldName, fieldType: fieldType });
                }
            });
        }
        return newFields;
    }

    private getUpdatedFieldListString(fields: Array<TableField>): string {
        let fieldListString = "";
        if (fields) {
            fields.forEach(f => {
                let fieldStringRep = f.fieldName + ':' + f.fieldType;
                if (fieldListString !== "")
                    fieldListString = fieldListString + ",";
                fieldListString = fieldListString + fieldStringRep;
            });
        }
        return fieldListString;
    }

    private getFields(fielTypeValues: Array<JSX.Element>): Array<JSX.Element> {
        let fieldcontrols: Array<JSX.Element> = [];
        let index = 0;
        this.state.tableBeingCreated.fields.forEach(f => {
            let deleteIcon = (<MDBIcon id={index} icon="trash-alt" onClick={this.onDeleteFieldClick.bind(this)} />);
            let row = (
                <tr key={'tbl_field_' + index}>
                    <td>
                        <input type="text" id={"fieldNameId_" + index} className="form-control"
                            value={f.fieldName}
                            onChange={this.onFieldNameChange.bind(this)}
                        />
                    </td>
                    <td>
                        <select id={"fieldtypeid_" + index} className="browser-default custom-select"
                            value={f.fieldType}
                            onChange={this.onFieldTypeChange.bind(this)}>
                            {fielTypeValues}
                        </select>
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
        let tableBeingCreated = { ...this.state.tableBeingCreated, catalogId: this.props.selectedCatalogId }
        this.props.createTable(tableBeingCreated).then(() => {
            this.setState(this.getInitialState(this.props.selectedCatalogId));
        });
    }

}

export default connect(mapStateToProps, mapDispatcherToProps)(CreateTableComponent);
