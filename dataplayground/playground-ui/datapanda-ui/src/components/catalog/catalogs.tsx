import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as asyncactions from '../../store/catalog/async-actions';
import { CatalogActions } from '../../store/catalog/types';
import { ApplicationRootState } from '../../store/ApplicationState';
import  CreateCatalogComponent from './createCatalogComponent';

const mapStateToProps = (state: ApplicationRootState) => {
    return {
        catalogs: state.catalog.catalogItems
    };
}

const mapDispatcherToProps = (dispatch: Dispatch<CatalogActions>) => {
    return {
        loadCatalogs: () => asyncactions.loadCatalogs(dispatch)
    }
}

type ICatalogComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;


class CatalogComponent extends React.Component<ICatalogComponentProps, Object> {

    public componentDidMount() {
        this.props.loadCatalogs();
    }

    public render() {

        return (
            <div style={{ margin: '20px' }}>
                <h2>Catalogs</h2>
                {this.props.catalogs.loading && <div>Loading...</div>}
                {this.props.catalogs.error && <div>{this.props.catalogs.error}</div>}
                <ul>
                    {this.props.catalogs.items.map(c => <li key={c.id}>{c.id} : {c.name} : {c.connectorId} </li>)}
                </ul>
                <CreateCatalogComponent/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(CatalogComponent);