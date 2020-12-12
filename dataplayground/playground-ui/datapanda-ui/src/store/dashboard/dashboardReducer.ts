import { ChartType } from "../../models/dashboard/DashboardModel";
import { DashboardState } from "./DashboardState";

const initialState: DashboardState = {
    selectedDashboard: {
        name:"Test Dashboard",
        title:"Test Dashboard",
        charts: [
            {
                name:"CustomersByGender",
                title:"Customers By Gender",
                sql:"select count(Id) as Count, gender from Individuals group by gender",
                chartType: ChartType.DOUGHNUT,
                definition: {
                    labelColumnName: "gender"
                    , dataColumnName: "Count"
                }
            },
            {
                name:"CustomersByOccupation",
                title:"Customers By Occupation",
                sql:"select count(Id) as Count, occupation from Individuals group by occupation",
                chartType: ChartType.BAR,
                definition: {
                    labelColumnName: "occupation"
                    , dataColumnName: "Count"
                }
            }
        ]
    }
}

export function dashboardReducer(state: DashboardState = initialState, action: any): DashboardState {
    switch (action.type) {
        default:
            return state;
    }
}