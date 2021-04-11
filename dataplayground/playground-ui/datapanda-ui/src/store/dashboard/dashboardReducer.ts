import { ChartType } from "../../models/dashboard/DashboardModel";
import { DashboardState } from "./DashboardState";
import { DashboardActions, DashboardConstants } from './dashboardActions';

const initialState: DashboardState = {
    selectedDashboard: undefined,
    dashboards:[]
}

export function dashboardReducer(state: DashboardState = initialState, action: DashboardActions): DashboardState {
    switch (action.type) {
        case DashboardConstants.FINISHED_LOADING_DASHBOARDS:
            return {...state,dashboards:action.dashboards};
        case DashboardConstants.SELECT_DASHBORAD:
            return {...state, selectedDashboard: action.dashboard};
        default:
            return state;
    }
}