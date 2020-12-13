import { Action } from 'redux';
import { DashboardDefinition } from '../../models/dashboard/DashboardModel';

export enum DashboardConstants {
    FINISHED_LOADING_DASHBOARDS = "FINISHED_LOADING_DASHBOARDS",
    SELECT_DASHBORAD = "SELECT_DASHBOARD" 
}

export interface FinishLoadingDashboardsAction  extends Action<DashboardConstants.FINISHED_LOADING_DASHBOARDS> {
    dashboards: Array<DashboardDefinition>;
} 

export function finishLoadingDashboards( dashboards: Array<DashboardDefinition> ): FinishLoadingDashboardsAction {
    return {
        type: DashboardConstants.FINISHED_LOADING_DASHBOARDS
        , dashboards
    };
}

export interface SelectDashboardsAction  extends Action<DashboardConstants.SELECT_DASHBORAD> {
    dashboard?: DashboardDefinition;
} 

export function selectDashboard( dashboard?: DashboardDefinition ): SelectDashboardsAction {
    return {
        type: DashboardConstants.SELECT_DASHBORAD
        , dashboard
    };
}

export type DashboardActions = FinishLoadingDashboardsAction | SelectDashboardsAction;