
import { CatalogModel } from '../../models/catalog/CatalogModel';
import { ApplicationRootState } from '../../store/ApplicationState';
import { CatalogActions } from '../../store/catalog/types';
import * as asyncactions from '../../store/catalog/async-actions';
import { Dispatch } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { CatalogType } from '../../models/catalog/CatalogType';


export interface ICreateCatalogComponentStateProps {
    creating: boolean;
    error?: string;
}

const mapStateToProps = (state: ApplicationRootState) => {

    let props: ICreateCatalogComponentStateProps = {
        creating: state.catalog.createCatalog.creating,
        error: state.catalog.createCatalog.error
    };
    return props;

}

const mapDispatcherToProps = (dispatch: Dispatch<CatalogActions>) => {
    return {
        createCatalog: (catalog: CatalogModel) => asyncactions.addCatalog(dispatch, catalog)
    }
}

type ICreateCatalogComponentProps = ICreateCatalogComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

export interface ICreateCatalogLocalState {
    catalogBeingCreated: CatalogModel
}

class CreateCatalogComponent extends React.Component<ICreateCatalogComponentProps, ICreateCatalogLocalState> {

    constructor(props: ICreateCatalogComponentProps) {
        super(props);
        this.state = { catalogBeingCreated: { id: "", catalogType: CatalogType.HIVE, name: "", connectorId: "hive-hadoop2", properties: {} } }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: React.ChangeEvent) {
        let textbox = event.target as HTMLInputElement;
        let idValue = textbox.value;
        idValue = idValue.toUpperCase().replaceAll(' ', '_');

        let catalogBeingCreated = { ...this.state.catalogBeingCreated, name: textbox.value, id: idValue };
        this.setState({ catalogBeingCreated })
    }

    public handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.createCatalog(this.state.catalogBeingCreated);
    }

    render() {
        let lastError = null;
        if (this.props.error) {
            lastError = <div>Error {this.props.error}</div>
        }

        let creating = null;
        let createForm = (
            <form onSubmit={this.handleSubmit}>
                <fieldset disabled={this.props.creating === true}>
                    <label>
                        Name:
                <input type="text" value={this.state.catalogBeingCreated.name} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </fieldset>
            </form>
        );
        if (this.props.creating) {
            creating = <div>Creating...</div>
        }
        else {

        }

        return (
            <div>
                {lastError}
                {creating}
                {createForm}
            </div>
        )
    }


}

export default connect(mapStateToProps, mapDispatcherToProps)(CreateCatalogComponent); 