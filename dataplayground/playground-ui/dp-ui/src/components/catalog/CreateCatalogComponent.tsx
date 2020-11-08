import React from 'react';
import { ICreateCatalogComponentState } from '../state/PlayGroundState';

interface ICreateCatalogComponentProps {

    context: ICreateCatalogComponentState
}

export class CreateCatalogComponent extends React.Component<ICreateCatalogComponentProps,ICreateCatalogComponentState> {

    constructor(props: ICreateCatalogComponentProps) {
        super(props);
        this.state = props.context;
    }

    render(): React.ReactNode {
        return <div>Create Catalog</div>;
    }
}