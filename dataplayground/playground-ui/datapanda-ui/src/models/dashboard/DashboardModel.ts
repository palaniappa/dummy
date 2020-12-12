export enum ChartType {
    PIE = "PIE",
    DOUGHNUT = "DOUGHNUT",
    LINE = "LINE",
    BAR = "BAR"
}
export interface DashboardDefinition {
    name: string;
    title: string;
    charts: Array<ChartDefinition>;
}

export interface ChartDefinition {
    name: string;
    title: string;
    sql: string;
    chartType: ChartType;
    definition: DoughnutChartTypeDefinition;
}

export interface DoughnutChartTypeDefinition {
    labelColumnName: string;
    dataColumnName: string;
}