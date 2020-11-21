
import { CatalogModel } from '../../models/catalog/CatalogModel';
import { ApplicationRootState } from '../../store/ApplicationState';
import { CatalogActions } from '../../store/catalog/types';
import * as asyncactions from '../../store/catalog/catalogAsyncActions';
import { Dispatch } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { CatalogType } from '../../models/catalog/CatalogType';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { PlaygroundButton } from '../componentConstants';


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
        this.state = { catalogBeingCreated: { id: "", catalogType: CatalogType.S3, name: "", properties: {}, databaseName: "default" } }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: React.ChangeEvent) {
        let textbox = event.target as HTMLInputElement;
        if(textbox.id == "catalogName"){
            let idValue = textbox.value;
            idValue = idValue.toUpperCase().replaceAll(' ', '_');

            let catalogBeingCreated = { ...this.state.catalogBeingCreated, name: textbox.value, id: idValue };
            this.setState({ catalogBeingCreated })
        }
        // else {

        //     let properyName = textbox.id.replace("_control_id","");

        //     let catalogBeingCreated = { ...this.state.catalogBeingCreated, properties: {...this.state.catalogBeingCreated.properties, this.state.catalogBeingCreated.properties[properyName]}  };
        //     this.setState({ catalogBeingCreated })
        // }
        
    }

    public handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let props = this.getApplicableProps(this.state.catalogBeingCreated.catalogType);

        let propertyValues: {[name:string]:string} = {};
        let formElement = event.target as HTMLFormElement;
        for(let i=0;i<formElement.elements.length;++i){
            let inputElement = formElement.elements.item(i) as HTMLInputElement; 
            if(inputElement) {
                if(props.indexOf(inputElement.name) > -1) {
                    propertyValues[inputElement.name] = inputElement.value;
                }
            }

        }

        let catalogBeingCreated = { ...this.state.catalogBeingCreated, properties: propertyValues };
        this.setState({ catalogBeingCreated })
        
        this.props.createCatalog(catalogBeingCreated);
    }

    render() {
        let lastError = null;
        if (this.props.error) {
            lastError = <div>Error {this.props.error}</div>
        }


        // let createForm = (
        //     <form onSubmit={this.handleSubmit}>
        //         <fieldset disabled={this.props.creating === true}>
        //             <label>
        //                 Name:
        //         <input type="text" value={this.state.catalogBeingCreated.name} onChange={this.handleChange} />
        //             </label>
        //             <input type="submit" value="Submit" />
        //         </fieldset>
        //     </form>
        // );

        let createForm = this.getForm();

        let creating = null;
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


    private getForm() {

        

        let catalogProps = this.getCatalogPropsForm();

        return (
            <MDBContainer fluid={true}>
                <MDBRow>
                    <MDBCol md="12">
                        <form onSubmit={this.handleSubmit}>
                            <p className="h4 text-center mb-4">Data Sources</p>
                            <fieldset disabled={this.props.creating === true}>
                                <MDBRow>
                                    <MDBCol>
                                    <label htmlFor="catalogId" className="grey-text">Id</label>
                                        <input type="text" id="catalogId" className="form-control"
                                            disabled={true}
                                            value={this.state.catalogBeingCreated.id}
                                        />
                                        <br />

                                        <label htmlFor="catalogName" className="grey-text">Name</label>
                                        <input type="text" id="catalogName" className="form-control"
                                            value={this.state.catalogBeingCreated.name}
                                            onChange={this.handleChange}
                                        />
                                        <br />

                                        <label htmlFor="catalogType" className="grey-text">Type</label>
                                        <input type="text" id="catalogType" className="form-control"
                                            disabled={true}
                                            value={this.state.catalogBeingCreated.catalogType}
                                        />
                                        <br />
                                        <label htmlFor="databaseName" className="grey-text">Type</label>
                                        <input type="text" id="databaseName" className="form-control"
                                            disabled={true}
                                            value={this.state.catalogBeingCreated.databaseName}
                                        />
                                        
                                    </MDBCol>
                                    <MDBCol>
                                        {catalogProps}
                                    </MDBCol>
                                </MDBRow>
                                
                                <br />
                                <div className="text-center">
                                    <PlaygroundButton type='submit'>Create</PlaygroundButton>
                                </div>
                                <br />
                            </fieldset>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

    private getCatalogPropsForm(): Array<JSX.Element> {
        let applicableProps = this.getApplicableProps(this.state.catalogBeingCreated.catalogType);
        let formItems:Array<JSX.Element> = [];
        applicableProps.forEach( p => {
            let propControls = (
                <div>
                     <label htmlFor={p + '_control_id'} className="grey-text">{p}</label>
                    <input type="text" id={p + '_control_id'} name={p} className="form-control"
                        value={this.state.catalogBeingCreated.properties[p]}
                    />
                    <br />
                </div>
            );
            formItems.push(propControls);
        });
        return formItems;
    }

    private getApplicableProps(catalogType: string) {
        let applicableProps = [];
        if(catalogType === "S3") {
            // TODO avoid this hardcoding..
            applicableProps.push("S3 Endpoint");
            applicableProps.push("AWS Access Key");
            applicableProps.push("AWS Secret Key");
        }
        return applicableProps;
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(CreateCatalogComponent); 