import { QueryState } from './queryState';
import { QueryConstants, QueryActions } from './queryActions';

const sampleQuery = 
`--Type the SQL here 
select 

    i.id, i.personname, i.email, count(o.order_id) as CountOfSales, sum(o.sales) as TotalSales, 
    avg(o.sales) as AverageSales, sum(o.quantity) as TotalQuantity, sum(o.discount) as TotalDiscount, 
    sum(o.profit) as TotalProfit, avg(o.profit) as AverageProfit
    
from testorders o
left outer join Individuals i
    on o.IndividualId = i.id 
    
group by
    i.id, i.personname, i.email
limit 100`;

const init: QueryState = {
    executing: false
    , queryResult: undefined
    , sqlQuery: sampleQuery
    
}

export function queryReducer(state: QueryState = init, action: QueryActions): QueryState {

    switch(action.type) {
        case QueryConstants.SET_EXECUTING:
            return { ...state, executing: action.executing, sqlQuery: action.query, errorMessage: undefined};
        case QueryConstants.EXECUTE_FAILED:
            return {...state, executing: false, errorMessage: action.errorMessage};
        case QueryConstants.EXECUTE_FINISHED:
            return {...state, queryResult: action.queryResult, executing: false, errorMessage: undefined};
        default:
            return state;
    }

}