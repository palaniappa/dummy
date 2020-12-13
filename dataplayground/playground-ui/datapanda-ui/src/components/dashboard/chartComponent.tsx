import React from 'react';
import { Doughnut, Line, Bar, ChartData } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';
import { ChartDefinition, ChartType, DoughnutChartTypeDefinition } from '../../models/dashboard/DashboardModel';
import { QueryResult } from '../../models/query/QueryReuslt';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { Button } from 'react-bootstrap';


interface IChartComponentProps {
    chart: ChartDefinition;
    executeChartSql: (sql:string) => Promise<QueryResult>;
    saveDashboardChart: (chart: ChartDefinition) => Promise<void|ChartDefinition>;
}

interface IChartLocalState {
    queryResult?: QueryResult;
    errorMessage?: string;
    chartBeingEdited?: ChartDefinition;
    definition?: DoughnutChartTypeDefinition;
}

export class ChartComponent extends React.Component<IChartComponentProps, IChartLocalState> {

    private DEFAULT_HEIGHT = 120;

    constructor(props: IChartComponentProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        this.refreshChart();
        
    }

    render() {
        
        let mainContent = null;
        let buttons = this.getButtons();
        if(this.state.chartBeingEdited){
            mainContent = this.getChartEditForm();
        
        }
        else{
            let data = this.getData();
            if(data) {
                if(this.props.chart?.chartType == ChartType.DOUGHNUT) {
                    mainContent = <Doughnut data={data} height={this.DEFAULT_HEIGHT}/>;
                }
                else if(this.props.chart?.chartType == ChartType.BAR) {
                    mainContent = <Bar data={data} height={this.DEFAULT_HEIGHT}/>;
                }
                else {
                    mainContent = <div>Don't know what is happening...</div>
                }
            }
            else {
                if(this.state.errorMessage) {
                    mainContent = <div>{this.state.errorMessage}</div>
                }
                else if(!this.props.chart.sql){
                    mainContent = <div >Define the sql...</div>
                }
                else {
                    mainContent = <div>Loading...</div>
                }
            }
        } 
        
        return (
          
            <MDBContainer fluid={true}>
                <MDBCol size={"12"}>
                    <MDBRow>
                        {mainContent}
                    </MDBRow>
                    {buttons}
                </MDBCol>
            </MDBContainer>
        );
    }

    private editChart(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        console.log("edit chart");
        let defString= "{}";
        if(this.state.chartBeingEdited?.definition){
            defString = this.state.chartBeingEdited?.definition;
        }
        let def:any = JSON.parse(defString);
        this.setState({...this.state,chartBeingEdited:this.props.chart, definition: def});
    }

    private deleteChart(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        console.log("delete chart");
    }

    private saveChart(event: React.FormEvent) {
        event.preventDefault();
        console.log("save chart");
        if(this.state.chartBeingEdited && this.state.definition){
            let chartToSave = {...this.state.chartBeingEdited,definition: JSON.stringify(this.state.definition)};
            this.props.saveDashboardChart(chartToSave).then( () => {
                this.setState({...this.state,chartBeingEdited:undefined, definition: undefined});
                this.refreshChart();
            })
        }
        
    }

    private cancelEdit(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        console.log("cancel edit chart");
        this.setState({...this.state,chartBeingEdited:undefined});
    }

    private getButtons(): JSX.Element {
        if (!this.state.chartBeingEdited) {
            return (<MDBRow>
                <Button variant="primary" size="sm"
                    onClick={this.editChart.bind(this)}
                >
                    Edit
                        </Button>
                <Button variant="primary" size="sm"
                    onClick={this.deleteChart.bind(this)}
                >
                    Delete
                        </Button>
            </MDBRow>);
        }
        return <div />;
    }

    private getChartEditForm(): JSX.Element {
        let chartTypeValues: Array<JSX.Element> = [];
        chartTypeValues.push(<option value={ChartType.DOUGHNUT}>{ChartType.DOUGHNUT}</option>);
        chartTypeValues.push(<option value={ChartType.BAR}>{ChartType.BAR}</option>);
        

        return (
            <form onSubmit={this.saveChart.bind(this)}>
                <fieldset >
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <label htmlFor="titleId" className="grey-text">Title</label>
                                <input type="text" id="titleId" className="form-control"
                                    value={this.state.chartBeingEdited?.title}
                                    onChange={this.onValueChange.bind(this)}
                                />
                            </MDBRow>
                            <MDBRow>
                                <label htmlFor="descriptionId" className="grey-text">Description</label>
                                <input type="text" id="descriptionId" className="form-control"
                                    value={this.state.chartBeingEdited?.description}
                                    onChange={this.onValueChange.bind(this)}
                                />
                            </MDBRow>
                            <MDBRow>
                                <label htmlFor="sqlTextId" className="grey-text">SQL</label>
                                <textarea rows={5} id="sqlTextId" className="form-control"
                                        value={this.state.chartBeingEdited?.sql}
                                        onChange={this.onValueChange.bind(this)}
                                />
                            </MDBRow>
                            <MDBRow>
                                <label htmlFor="chartTypeId" className="grey-text">Chart Type</label>
                                <select id={"chartTypeId"} className="browser-default custom-select"
                                value={this.state.chartBeingEdited?.chartType}
                                onChange={this.onChartTypeChange.bind(this)}>
                                {chartTypeValues}
                                </select>
                            </MDBRow>
                            <MDBRow>
                                <label htmlFor="labelColumnNameId" className="grey-text">Label Column Name</label>
                                <input type="text" id="labelColumnNameId" className="form-control"
                                    value={this.state.definition?.labelColumnName}
                                    onChange={this.onValueChange.bind(this)}
                                />
                            </MDBRow>
                            <MDBRow>
                                <label htmlFor="dataColumnNameId" className="grey-text">Value Column Name</label>
                                <input type="text" id="dataColumnNameId" className="form-control"
                                    value={this.state.definition?.dataColumnName}
                                    onChange={this.onValueChange.bind(this)}
                                />
                            </MDBRow>
                            <MDBRow>
                                <Button variant="primary" size="sm"
                                    onClick={this.cancelEdit.bind(this)}
                                >
                                    Cancel
                                </Button>
                                <Button variant="primary" size="sm" type='submit'>
                                    Save
                                </Button>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                    {/* <br />
                        <div className="text-center">
                            <Button type='submit'>Add Table</Button>
                        </div>
                        <br /> */}
                </fieldset>
            </form>
        );
    }

    private onChartTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let chartBeingEdited:any = { ...this.state.chartBeingEdited, chartType: event.target.value as ChartType };
            this.setState({ ...this.state, chartBeingEdited: chartBeingEdited });   
        
    }

    private onValueChange(event: React.ChangeEvent) {
        let textElement = event.target as HTMLInputElement;
        if (textElement.id === "titleId") {
            let chartBeingEdited:any = { ...this.state.chartBeingEdited, title: textElement.value };
            this.setState({ ...this.state, chartBeingEdited: chartBeingEdited });
        }
        else if (textElement.id === "descriptionId") {
            let chartBeingEdited:any = { ...this.state.chartBeingEdited, description: textElement.value };
            this.setState({ ...this.state, chartBeingEdited: chartBeingEdited });
        } else if (textElement.id === "sqlTextId") {
            let chartBeingEdited:any = { ...this.state.chartBeingEdited, sql: textElement.value };
            this.setState({ ...this.state, chartBeingEdited: chartBeingEdited });
        }
        else if (textElement.id === "labelColumnNameId") {
            let def:any = {...this.state.definition, labelColumnName: textElement.value};
            this.setState({ ...this.state, definition: def });
        }
        else if (textElement.id === "dataColumnNameId") {
            let def:any = {...this.state.definition, dataColumnName: textElement.value};
            this.setState({ ...this.state, definition: def });
        }
    }

    private refreshChart() {
        if(this.props.chart.sql){
            this.props.executeChartSql(this.props.chart.sql).then( (result: QueryResult) => {
                this.setState({...this.state,queryResult: result, errorMessage: undefined});
            }).catch( (error) => {
                this.setState({...this.state,queryResult:undefined, errorMessage: error.message});
            });
        }
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
            let def:DoughnutChartTypeDefinition = JSON.parse(this.props.chart.definition);
            if(def.dataColumnName && def.labelColumnName) {
                let data: any = {};
                data.labels = [];
                data.datasets = [];
                data.datasets.push({data:[]});

                this.state.queryResult.records.forEach( r => {
                    data.labels.push(r[def.labelColumnName]);
                    data.datasets[0].data.push(r[def.dataColumnName]);
                });
                return data;
            }
        }
        return null;
    }
}