import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationRootState } from '../../store/ApplicationState';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody } from 'mdbreact';
import { Button } from 'react-bootstrap';
import 'chartjs-plugin-colorschemes';
import { DashboardDefinition } from '../../models/dashboard/DashboardModel';
import { executeChartQuery, loadDashboards, loadSelectedDashboard, saveDashboard, deleteDashboard } from '../../store/dashboard/dashboardAsyncActions';
import { QueryResult } from '../../models/query/QueryReuslt';
import { DashboardActions } from '../../store/dashboard/dashboardActions';
import DashboardComponent from './dashboardComponent';
import { CommonUtil } from '../../utils/CommonUtil';

interface IDashboardMainComponentStateProps {
    dashboards?: Array<DashboardDefinition>;
    selectedDashboard?: DashboardDefinition;
}

const mapStateToProps = (state: ApplicationRootState): IDashboardMainComponentStateProps => {
    return {
        dashboards: state.dashboard.dashboards,
        selectedDashboard: state.dashboard.selectedDashboard
    };
}

const mapDispatcherToProps = (dispatch: Dispatch<DashboardActions>) => {
    return {
        executeChartQuery: (sql: string): Promise<QueryResult> => executeChartQuery(dispatch, sql)
        , loadDashboards: (): Promise<void | Array<DashboardDefinition>> => loadDashboards(dispatch)
        , selectDashboard: (selectedDashborad: DashboardDefinition) => loadSelectedDashboard(dispatch, selectedDashborad)
        , saveDashboard: (dashboard: DashboardDefinition) => saveDashboard(dispatch, dashboard)
        , deleteDashboard: (dashboardId: string) => deleteDashboard(dispatch, dashboardId)
    };
}

type IDashboardMainComponentProps = IDashboardMainComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

interface IDashboardMainComponentLocalState {
    dashboardBeingModified?: DashboardDefinition
}

class DashboardMainComponent extends React.Component<IDashboardMainComponentProps, IDashboardMainComponentLocalState> {

    constructor(props: IDashboardMainComponentProps) {
        super(props);
        this.state = {dashboardBeingModified: undefined};
    }

    public componentDidMount() {
        this.props.loadDashboards();
    }

    render() {
        let dashboards = this.getDashboards();
        let selectedDashboradDetails = this.getSelectedDashboradDetails();
        let dashboardCharts = this.getDashboardCharts();
        return (
            <MDBContainer fluid={true}>
                <MDBRow>
                    <MDBCol size="12">
                        <br></br>
                        <p className="h4 text-center mb-4">Dashboards</p>
                        <MDBRow>
                            <MDBCol size="2">
                                {dashboards}
                            </MDBCol>
                            <MDBCol size="10">
                                <MDBContainer fluid={true}>
                                    {selectedDashboradDetails}
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    {dashboardCharts}
                </MDBRow>
            </MDBContainer>
        );
    }

    private getDashboardCharts(): JSX.Element {
        if(this.props.selectedDashboard){
            return <DashboardComponent />
        }
        return <div></div>;
    }
    private getDashboards(): JSX.Element {

        let optionValues: Array<JSX.Element> = [];
        optionValues.push(<option value={'NONE'}>Select Dashboard</option>);
        this.props.dashboards?.forEach(c => {
            optionValues.push(<option value={c.id}>{c.title}</option>);
        });

        return (
            <div>
                <label htmlFor="catalogsAvailable" className="grey-text">Data Sources</label>
                <select id="catalogsAvailable" className="browser-default custom-select" value={this.props.selectedDashboard?.id} onChange={this.handleDashboardChange.bind(this)}>
                    {optionValues}
                </select>
            </div>
        );
    }

    private getSelectedDashboradDetails(): JSX.Element {
        if (this.state.dashboardBeingModified) {
            let selectedItem = (
                <MDBTable>
                    <MDBTableBody>
                        <tr>
                            <td><b>Title</b></td>
                            <td>
                                <input type="text" id="dashboradTitle" className="form-control"
                                    value={this.state.dashboardBeingModified?.title}
                                    onChange={this.onValueChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td><b>Description</b></td>
                            <td>
                                <input type="text" id="dashboradDescription" className="form-control"
                                    value={this.state.dashboardBeingModified?.description}
                                    onChange={this.onValueChange.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align="center">
                                <Button variant="primary" size="sm"
                                    onClick={this.createNew.bind(this)}>
                                    Create New
                                </Button>
                                <Button variant="primary" size="sm"
                                    onClick={this.update.bind(this)}>
                                    Save
                                </Button>
                                <Button variant="primary" size="sm"
                                    onClick={this.delete.bind(this)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    </MDBTableBody>
                </MDBTable>
            );
            return selectedItem;
        } else if(this.props.selectedDashboard) {
            this.setState({...this.state,dashboardBeingModified: this.props.selectedDashboard})
        }

        return <div>Select any dashboard</div>;
    }

    private createNew(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.preventDefault();
        console.log("Create New clicked..!");
        let d: DashboardDefinition = {
            id: CommonUtil.generateUuid()
            , title: "New Dashboard"
            , description: "New dashborad description"
        };
        this.props.saveDashboard(d).then( createdDashboard => {
            if(createdDashboard) {
                this.props.selectDashboard(createdDashboard).then( () =>{
                    this.setState({...this.state,dashboardBeingModified: createdDashboard});
                })
            }
        });
    }

    private update(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.preventDefault();
        console.log("Create New clicked..!");
        if(this.state.dashboardBeingModified) {
            this.props.saveDashboard(this.state.dashboardBeingModified).then( d => {
                if(d) {
                    this.props.selectDashboard(d);
                }
            });
        }
        
    }

    private delete(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.preventDefault();
        console.log("Create New clicked..!");
        if(this.state.dashboardBeingModified) {
            this.props.deleteDashboard(this.state.dashboardBeingModified.id).then( ()=>{
                this.setState({...this.state,dashboardBeingModified:undefined});
            });
        }
    }

    private onValueChange(event: React.ChangeEvent) {
        let textElement = event.target as HTMLInputElement;
        if (textElement.id === "dashboradTitle") {
            let dashboardBeingModified: any = { ...this.state.dashboardBeingModified, title: textElement.value };
            this.setState({ ...this.state, dashboardBeingModified: dashboardBeingModified });
        }
        else if (textElement.id === "dashboradDescription") {
            let dashboardBeingModified: any = { ...this.state.dashboardBeingModified, description: textElement.value };
            this.setState({ ...this.state, dashboardBeingModified: dashboardBeingModified });
        } 
    }

    private handleDashboardChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        let newSelectedDashborad = this.props.dashboards?.filter(d => d.id === event.target.value);
        if (newSelectedDashborad && newSelectedDashborad[0]) {
            this.props.selectDashboard(newSelectedDashborad[0]);
            this.setState({ ...this.state, dashboardBeingModified: newSelectedDashborad[0] });
        }

        //this.props.loadTablesOfSelectedCatalog(event.target.value);
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(DashboardMainComponent);