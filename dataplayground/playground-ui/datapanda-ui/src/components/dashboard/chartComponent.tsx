import React from 'react';
import { Doughnut, Line, Bar, ChartData } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';
import { ChartDefinition, ChartType } from '../../models/dashboard/DashboardModel';
import { QueryResult } from '../../models/query/QueryReuslt';


interface IChartComponentProps {
    chart: ChartDefinition;
    executeChartSql: (sql:string) => Promise<QueryResult>;
}

interface IChartLocalState {
    queryResult?: QueryResult;
    errorMessage?: string;
}

export class ChartComponent extends React.Component<IChartComponentProps, IChartLocalState> {

    constructor(props: IChartComponentProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        this.props.executeChartSql(this.props.chart.sql).then( (result: QueryResult) => {
            this.setState({...this.state,queryResult: result, errorMessage: undefined});
        }).catch( (error) => {
            this.setState({...this.state,queryResult:undefined, errorMessage: error.message});
        });
    }

    render() {
        let data = this.getData();
        let chart = null;
        if(data) {
            if(this.props.chart?.chartType == ChartType.DOUGHNUT) {
                chart = <Doughnut data={data} height={120}/>;
            }
            else if(this.props.chart?.chartType == ChartType.BAR) {
                chart = <Bar data={data} height={120}/>;
            }
        }
        else {
            chart = <div>Loading...</div>
        }
        
        return (
          
            <div>
                {chart}
            </div>
            
          
        );
    }

    private getData(): ChartData<any> {

        // const data = {
        //     labels: [
        //         'Red',
        //         'Green',
        //         'Yellow'
        //     ],
        //     datasets: [{
        //         data: [300, 50, 100],
        //         backgroundColor: [
        //         '#FF6384',
        //         '#36A2EB',
        //         '#FFCE56'
        //         ],
        //         hoverBackgroundColor: [
        //         '#FF6384',
        //         '#36A2EB',
        //         '#FFCE56'
        //         ]
        //     }]
        // };

        if(this.state.queryResult) {
            let data: any = {};
            data.labels = [];
            data.datasets = [];
            data.datasets.push({data:[]});

            this.state.queryResult.records.forEach( r => {
                data.labels.push(r[this.props.chart.definition.labelColumnName]);
                data.datasets[0].data.push(r[this.props.chart.definition.dataColumnName]);
            });
            return data;
        } else if(this.state.errorMessage) {
            return <div>{this.state.errorMessage}</div>
        }
        return null;
    }
}