export enum ChartType {
    PIE = "PIE",
    DOUGHNUT = "DOUGHNUT",
    LINE = "LINE",
    BAR = "BAR"
}
export interface DashboardDefinition {
    id: string;
    title: string;
    description?: string;
    charts?: Array<ChartDefinition>;
}

export interface ChartDefinition {
    id: string;
    title: string;
    description?: string;
    dashboardId: string;
    sql: string;
    chartType: ChartType;
    definition: string;
}

export interface DoughnutChartTypeDefinition {
    labelColumnName: string;
    dataColumnName: string;
}

export interface SeriesChartTypeDefinition {
    axisColumnName: string;
    series: Array<string>;
}