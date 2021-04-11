import React from 'react';
import { Dispatch } from 'redux';
import { ApplicationRootState } from '../../store/ApplicationState';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow,MDBCol} from 'mdbreact';
import { ChartComponent } from './chartComponent';
import { Button } from 'react-bootstrap';
import 'chartjs-plugin-colorschemes';
import { ChartDefinition, ChartType, DashboardDefinition } from '../../models/dashboard/DashboardModel';
import { executeChartQuery, saveDashboardChart } from  '../../store/dashboard/dashboardAsyncActions';
import { QueryResult } from '../../models/query/QueryReuslt';
import { Action } from 'typesafe-actions';
import { CommonUtil } from '../../utils/CommonUtil';

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
        , saveDashboardChart: (dashboard: DashboardDefinition, chart: ChartDefinition):Promise<void|ChartDefinition> => saveDashboardChart(dispatch, dashboard, chart)
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

        // let chart1 = null;
        // if(this.props.dashboard && this.props.dashboard.charts && this.props.dashboard?.charts[0]){
        //     chart1 = <ChartComponent chart={this.props.dashboard?.charts[0]} executeChartSql={this.props.executeChartQuery}/>
        // }
        // let chart2 = null;
        // if(this.props.dashboard && this.props.dashboard.charts && this.props.dashboard?.charts[1]){
        //     chart2 = <ChartComponent chart={this.props.dashboard?.charts[1]}  executeChartSql={this.props.executeChartQuery}/>
        // }

        let charts = this.getCharts();

        return (
            <MDBContainer fluid={true}>
                <MDBRow center={true}>
                    <MDBCol size="12">
                        <br></br>
                        <p className="h4 text-center mb-4">{this.props.dashboard?.title}</p>
                        <p className= "text-center mb-1">{this.props.dashboard?.description}</p>
                        {charts}
                        <MDBRow center={true}>
                            <MDBCol>
                                <Button variant="primary" size="sm"
                                    onClick={this.addNewChart.bind(this)}
                                    disabled = {
                                        this.props.dashboard?.charts?.length == 6
                                    }>
                                    Add New
                                </Button>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

    private getCharts():Array<JSX.Element> {
        let charts: Array<JSX.Element> = [];
        let noOfChatsInRow = 1;
        let colSize: string = (12/noOfChatsInRow).toString();
        if(this.props.dashboard?.charts) {
            let currentRowItems:Array<JSX.Element> = [];
            this.props.dashboard.charts.forEach( c => {
                let cDisplay = (
                <MDBCol size={"12"}>
                    <ChartComponent key={c.id} chart={c} 
                        executeChartSql={this.props.executeChartQuery}
                        saveDashboardChart={this.saveDashboradChart.bind(this)}
                    />
                </MDBCol>
                );
                currentRowItems.push(cDisplay);
                if(currentRowItems.length == noOfChatsInRow) {
                    charts.push(<MDBRow>{currentRowItems}</MDBRow>);
                    currentRowItems = [];
                }
            });
            if(currentRowItems.length > 0) {
                charts.push(<MDBRow>{currentRowItems}</MDBRow>);
                currentRowItems = [];
            }
        }
        return charts;
    }
    
    public saveDashboradChart(chart: ChartDefinition): Promise<void|ChartDefinition> {
        if(this.props.dashboard){
            return this.props.saveDashboardChart(this.props.dashboard, chart);
        }
        throw Error("Invalid");
    }

    private addNewChart(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        if(this.props.dashboard){
            let c: ChartDefinition = {
                id: CommonUtil.generateUuid()
                , title: "New Chart"
                , description: "New chart description"
                , dashboardId: this.props.dashboard.id
                , sql: ""
                , chartType: ChartType.DOUGHNUT
                , definition: '{}'
            }
            this.props.saveDashboardChart(this.props.dashboard, c);
        }
        
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(DashboardComponent);