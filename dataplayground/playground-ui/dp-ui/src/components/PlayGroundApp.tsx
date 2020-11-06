import React from 'react';
import { QueryComponent } from './QueryComponent';
import { PlayGroundService } from '../service/PlayGroundService';
import { QueryResult } from "../models/QueryReuslt";


export interface IPlayGroundProps {

}

export interface IPlayGroundState {
    currentSql: string;
    executing: boolean;
    queryData?: QueryResult;
    error?: string;
}

export class PlayGroundApp extends React.Component<IPlayGroundProps, IPlayGroundState> {

    private service: PlayGroundService;;

    constructor(props: IPlayGroundProps) {
        super(props);
        this.state =
        {
            currentSql: "select sum(o.profit), o.individualid, c.personname from orders_erp.default.orders o join crm_customers.default.customers c on c.id = o.individualid group by o.individualid, c.personname"
            , executing: false
            , queryData: undefined
            , error: undefined

        };
        this.service = PlayGroundService.getInstance();
    }

    render(): React.ReactNode {

        let errorMessage;
        let resultTable;
        if (this.state.error) {
            errorMessage = <span>{this.state.error}</span>
        }
        else if (this.state.queryData) {
            resultTable = <div>{this.state.queryData.recordCount} retrieved</div>
        }


        return (

            <div>
                <QueryComponent
                    sqlQuery={this.state.currentSql}
                    executing={this.state.executing}
                    execute={this.executeSql.bind(this)}
                />
                {errorMessage}
                {resultTable}
            </div>
        );
    }

    executeSql(sql: string) {
        console.log('Executing sql ' + sql);

        let newState: IPlayGroundState = {
            currentSql: sql,
            executing: true
        };
        this.setState(newState);

        this.service.executeSql(sql).then(data => {
            newState.executing = false;
            newState.queryData = data;
            this.setState(newState);

        }).catch(error => {
            newState.executing = false;
            newState.error = error.message;
            this.setState(newState);
        });

    }


}