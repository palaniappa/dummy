export interface DashboardDefinition {
    name: string;
    title: string;
    charts: Array<ChartDefinition>;
}

export interface ChartDefinition {

    name: string;
    title: string;
    height: number;
    width: number;
    sql: string;
    chartTypeDefinition: DoughnutChartDefinition;
}

export interface DoughnutChartDefinition {
    labelColumn: string;
    dataColumn: string;
}

