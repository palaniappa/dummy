import React from 'react';
import { Doughnut, Pie, Line, Bar, ChartData } from 'react-chartjs-2';
import Chart from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';
import { ChartDefinition, ChartType, DoughnutChartTypeDefinition, SeriesChartTypeDefinition } from '../../models/dashboard/DashboardModel';
import { QueryResult } from '../../models/query/QueryReuslt';
import { MDBCol, MDBContainer, MDBRow, MDBIcon } from 'mdbreact';
import { Button } from 'react-bootstrap';
import 'chartjs-plugin-zoom';


interface IChartComponentProps {
    chart: ChartDefinition;
    executeChartSql: (sql:string) => Promise<QueryResult>;
    saveDashboardChart: (chart: ChartDefinition) => Promise<void|ChartDefinition>;
}

interface IChartLocalState {
    queryResult?: QueryResult;
    errorMessage?: string;
    chartBeingEdited?: ChartDefinition;
    definition?: DoughnutChartTypeDefinition | SeriesChartTypeDefinition;
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
                let options={
                    title: { display: true, text: this.props.chart.title },
                    zoom: {
                      enabled: true,
                      mode: 'x',
                    },
                    pan: {
                      enabled: true,
                      mode: 'x',
                    },
                  };

                if(this.props.chart?.chartType == ChartType.DOUGHNUT) {
                    mainContent = <Doughnut data={data} height={this.DEFAULT_HEIGHT} options={options}/>;
                }
                else if(this.props.chart?.chartType == ChartType.PIE) {
                    mainContent = <Pie data={data} height={this.DEFAULT_HEIGHT} options={options}/>;
                }
                else if(this.props.chart?.chartType == ChartType.BAR) {
                    mainContent = <Bar data={data} height={this.DEFAULT_HEIGHT} options={options}/>;
                }
                else if(this.props.chart.chartType == ChartType.LINE) {
                    mainContent = <Line data={data} height={this.DEFAULT_HEIGHT} options={options}/>;
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
        this.setState({...this.state,chartBeingEdited:this.props.chart, definition: JSON.parse(this.props.chart.definition)});
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
            return (<MDBRow center={true}>
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
        chartTypeValues.push(<option value={ChartType.BAR}>{ChartType.BAR}</option>);
        chartTypeValues.push(<option value={ChartType.DOUGHNUT}>{ChartType.DOUGHNUT}</option>);
        chartTypeValues.push(<option value={ChartType.LINE}>{ChartType.LINE}</option>);
        chartTypeValues.push(<option value={ChartType.PIE}>{ChartType.PIE}</option>);
        
        let chartTypeComponents = this.getChartTypeDefinitionComponents();

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
                            {chartTypeComponents}
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

    private getChartTypeDefinitionComponents() : Array<JSX.Element> {
        let elements: Array<JSX.Element> = [];
        
        if (this.state.definition) {
            if (this.state.chartBeingEdited?.chartType == ChartType.DOUGHNUT || this.state.chartBeingEdited?.chartType == ChartType.PIE) {
                let def = this.state.definition as DoughnutChartTypeDefinition;
                elements.push((
                    <MDBRow>
                        <label htmlFor="labelColumnNameId" className="grey-text">Label Column Name</label>
                        <input type="text" id="labelColumnNameId" className="form-control"
                            value={def.labelColumnName}
                            onChange={this.onValueChange.bind(this)}
                        /></MDBRow>));

                elements.push((
                    <MDBRow>
                        <label htmlFor="dataColumnNameId" className="grey-text">Value Column Name</label>
                        <input type="text" id="dataColumnNameId" className="form-control"
                            value={def.dataColumnName}
                            onChange={this.onValueChange.bind(this)}
                        />
                    </MDBRow>));
            }
            else if (this.state.chartBeingEdited?.chartType == ChartType.BAR || this.state.chartBeingEdited?.chartType == ChartType.LINE) {
                let def = this.state.definition as SeriesChartTypeDefinition;
                elements.push((
                    <MDBRow>
                        <label htmlFor="axisColumnNameId" className="grey-text">Axis Column Name</label>
                        <input type="text" id="axisColumnNameId" className="form-control"
                            value={def.axisColumnName}
                            onChange={this.onValueChange.bind(this)}/>
                    </MDBRow>));

                let seriesId = 0;
                if(def.series){
                    def.series.forEach( (s) =>{
                        let deleteIcon = (<MDBIcon id={seriesId} icon="trash-alt" onClick={this.deleteSeriesClick.bind(this)} />);
                        elements.push(
                            <MDBRow>
                                <label htmlFor={"seriesParentId"+seriesId} className="grey-text">Series {seriesId+1}:</label>
                                <MDBRow id={"seriesParentId"+seriesId}>
                                    <MDBCol size="10" >
                                        <input type="text" id={"seriesId_"+seriesId} className="form-control"
                                            value={s}
                                            onChange={this.onValueChange.bind(this)}/>
                                    </MDBCol>
                                    <MDBCol size="2" >
                                        {deleteIcon}
                                    </MDBCol>
                                </MDBRow>
                            </MDBRow>
                        );
                        seriesId++;
                     });
                }
                elements.push(<Button size="sm" onClick={this.addSeriesClick.bind(this)}>Add Series</Button>); 
            }
        }
        return elements;
    }

    private addSeriesClick(event: React.MouseEvent<HTMLElement, MouseEvent> | React.SyntheticEvent<HTMLButtonElement, Event>) {
        event.preventDefault();
        if(this.state.chartBeingEdited?.chartType == ChartType.LINE || this.state.chartBeingEdited?.chartType == ChartType.BAR){
            let existingDef = this.state.definition as SeriesChartTypeDefinition;
            let def:any = undefined;
            if(existingDef.series) {
                def = {...this.state.definition, series: existingDef.series.concat("")};
            } else {
                def = {...this.state.definition, series: [""]};
            }
            this.setState({...this.state,definition: def});
        }
        
    }

    private deleteSeriesClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        let idx = Number((event.target as HTMLButtonElement).id);
        if(this.state.chartBeingEdited?.chartType == ChartType.LINE || this.state.chartBeingEdited?.chartType == ChartType.BAR){
            let def = this.state.definition as SeriesChartTypeDefinition;

            let newDef: SeriesChartTypeDefinition = {
                ...def
                , series: def.series.slice(0, idx)
                    .concat(def.series.slice(idx + 1, def.series.length))
            };
            this.setState({ ...this.state, definition: newDef });
        }
    }

    private onChartTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let newDefinition = this.state.definition;
        let newChartType = event.target.value as ChartType;
        let typeCompatible = this.chartTypeDefinitionsAreCompatible(this.state.chartBeingEdited?.chartType, newChartType);
        if(typeCompatible == false) {
            if(newChartType == ChartType.DOUGHNUT || ChartType.PIE) {
                newDefinition = {labelColumnName:"", dataColumnName:""} as DoughnutChartTypeDefinition;
            }
            else if(newChartType == ChartType.BAR || newChartType == ChartType.LINE) {
                newDefinition = {axisColumnName:"", series:[]} as SeriesChartTypeDefinition;
            }
        }
        
        let chartBeingEdited:any = { ...this.state.chartBeingEdited, chartType:  newChartType};
        this.setState({ ...this.state, chartBeingEdited: chartBeingEdited, definition: newDefinition });   
        
    }

    private chartTypeDefinitionsAreCompatible(oldType: ChartType | undefined, newType: ChartType): boolean {
        if(oldType != undefined) {
            if( (oldType == ChartType.BAR || oldType == ChartType.LINE) && (newType == ChartType.BAR || newType == ChartType.LINE))
                return true;
            if( (oldType == ChartType.DOUGHNUT || oldType == ChartType.PIE) && (newType == ChartType.DOUGHNUT || newType == ChartType.PIE))
                return true;
        }
        
        return false;
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
        else if (textElement.id === "axisColumnNameId") {
            let def:any = {...this.state.definition, axisColumnName: textElement.value};
            this.setState({ ...this.state, definition: def });
        } else if (textElement.id.startsWith("seriesId_")) {
            let idx = Number(event.target.id.replace("seriesId_", ""));
            let def = this.state.definition as SeriesChartTypeDefinition;

            let newDef: SeriesChartTypeDefinition = {
                ...def
                , series: def.series.slice(0, idx)
                    .concat(textElement.value)
                    .concat(def.series.slice(idx + 1, def.series.length))
            };
            this.setState({ ...this.state, definition: newDef });
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

        if(this.state.queryResult) {
            if(this.props.chart.chartType == ChartType.DOUGHNUT || this.props.chart.chartType == ChartType.PIE) {
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

            if(this.props.chart.chartType == ChartType.LINE || this.props.chart.chartType == ChartType.BAR) {
                let def:SeriesChartTypeDefinition = JSON.parse(this.props.chart.definition);
                if(def.axisColumnName && def.series) {
                    let data: any = {};
                    data.labels = [];
                    data.datasets = [];
                    let idx = 0;
                    def.series.forEach( s => {
                        data.datasets.push({data:[]});
                        data.datasets[idx].label = s;
                        idx++;
                    });
                    

                    this.state.queryResult.records.forEach( r => {
                        data.labels.push(r[def.axisColumnName]);

                        let idx = 0;
                        def.series.forEach( s => {
                            data.datasets[idx].data.push(r[def.series[idx]]);
                            idx++;
                        });
                        
                    });
                    return data;
                }
            }
        }
        return null;
    }
}