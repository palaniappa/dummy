import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationRootState } from '../../store/ApplicationState';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow,MDBCol} from 'mdbreact';
import { ChartComponent } from './chartComponent';
import 'chartjs-plugin-colorschemes';
import { DashboardDefinition } from '../../models/dashboard/DashboardModel';
import { executeChartQuery } from  '../../store/dashboard/dashboardAsyncActions';
import {executeQuery} from '../../store/query/queryAsyncActions';
import { QueryResult } from '../../models/query/QueryReuslt';
import { Action } from 'typesafe-actions';

interface IDashboardComponentStateProps {
    dashboard?: DashboardDefinition
}

const mapStateToProps = (state: ApplicationRootState): IDashboardComponentStateProps => {
    return {
        dashboard: state.dashboard.selectedDashboard
    };
}

const mapDispatcherToProps = (dispatch: Dispatch<Action>) => {
    return {
        executeChartQuery: (sql:string):Promise<QueryResult> => executeChartQuery(dispatch, sql)
    };
}

type IDashboardComponentProps = IDashboardComponentStateProps & ReturnType<typeof mapDispatcherToProps>;

class DashboardComponent extends React.Component<IDashboardComponentProps, {}> {

    constructor(props: IDashboardComponentProps) {
        super(props);
    }

    public componentDidMount() {

    }

    render() {

        let chart1 = null;
        if(this.props.dashboard?.charts[0]){
            chart1 = <ChartComponent chart={this.props.dashboard?.charts[0]} executeChartSql={this.props.executeChartQuery}/>
        }
        let chart2 = null;
        if(this.props.dashboard?.charts[1]){
            chart2 = <ChartComponent chart={this.props.dashboard?.charts[1]}  executeChartSql={this.props.executeChartQuery}/>
        }

        return (
            <MDBContainer fluid={true}>
                <MDBRow>
                    <MDBCol size="12">
                        <br></br>
                        <p className="h4 text-center mb-4">Dashboards</p>
                        <MDBRow>
                        <MDBCol size="6">
                            {chart1}
                        </MDBCol>
                        
                        <MDBCol size="6">
                            {chart2}
                        </MDBCol>
                        </MDBRow>
                        
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(DashboardComponent);