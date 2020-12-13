import { Dispatch } from 'redux';
import { DashboardDefinition } from '../../models/dashboard/DashboardModel';
import { QueryResult } from '../../models/query/QueryReuslt';
import { PlayGroundService } from '../../service/PlayGroundService';
import { DashboardActions, finishLoadingDashboards, selectDashboard } from './dashboardActions';

export async function executeChartQuery( dispatch: Dispatch<DashboardActions>, sqlQuery: String) : Promise<QueryResult> {
    return PlayGroundService.getInstance().executeSql(sqlQuery);
}

export async function loadDashboards( dispatch: Dispatch<DashboardActions> ) : Promise<void|Array<DashboardDefinition>> {
    
    return PlayGroundService.getInstance().getDashboards().then( (dashboards: Array<DashboardDefinition>) => {
        dispatch(finishLoadingDashboards(dashboards));
        return dashboards;
    })
    .catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    );
}

export async function loadSelectedDashboard( dispatch: Dispatch<DashboardActions>, selectedDashboard: DashboardDefinition ) : Promise<void> {
    
    dispatch(selectDashboard(selectedDashboard));
    // return PlayGroundService.getInstance().getDashboards().then( (dashboards: Array<DashboardDefinition>) => {
    //     dispatch(finishLoadingDashboards(dashboards));
    //     return dashboards;
    // })
    // .catch(
    //     (error) => {
    //         //TODO handle error.
    //         console.log(error);
    //     }
    // );
}

export async function saveDashboard( dispatch: Dispatch<DashboardActions>, dashboard: DashboardDefinition ) : Promise<void|DashboardDefinition> {
    return PlayGroundService.getInstance().upsertDashboard(dashboard).then( (createdDashboard: DashboardDefinition) => {
        return loadDashboards(dispatch).then( () => {
            return createdDashboard;
    })})
    .catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    );
}

export async function deleteDashboard( dispatch: Dispatch<DashboardActions>, dashboardId: string ) : Promise<void> {
    return PlayGroundService.getInstance().deleteDashboard(dashboardId).then( () => {
        dispatch(selectDashboard(undefined));
        loadDashboards(dispatch);
    })
    .catch(
        (error) => {
            //TODO handle error.
            console.log(error);
        }
    );
}