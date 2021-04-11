import { DashboardDefinition } from '../../models/dashboard/DashboardModel';



export interface DashboardState {
    selectedDashboard?: DashboardDefinition;
    dashboards?: Array<DashboardDefinition>;
}