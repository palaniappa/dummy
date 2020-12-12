import { DashboardDefinition } from '../../models/dashboard/DashboardModel';

export enum TableConstants {
    EXECUTE_CHART_SQL = "EXECUTE_CHART_SQL"
}

export interface DashboardState {
    selectedDashboard?: DashboardDefinition;
}