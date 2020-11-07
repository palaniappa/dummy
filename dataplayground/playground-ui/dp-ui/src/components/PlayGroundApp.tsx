import React from 'react';
import { QueryComponent } from './QueryComponent';
import { QueryResultComponent } from './QueryResultComponent'
import { PlayGroundService } from '../service/PlayGroundService';
import { QueryResult } from "../models/QueryReuslt";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Navbar from 'react-bootstrap/Navbar';


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
            resultTable = <QueryResultComponent result={this.state.queryData} />
        }



        let main = (
            <Container fluid={true}>
                <Row>
                    <Col lg="6">
                        <QueryComponent
                            sqlQuery={this.state.currentSql}
                            executing={this.state.executing}
                            execute={this.executeSql.bind(this)} />
                    </Col>
                </Row>
                <Row>
                    <Col>{errorMessage}</Col>
                </Row>
                <Row>
                    <Col>
                        {resultTable}
                    </Col>
                </Row>
            </Container>
        );

        let menus = this.getNavigations();

        return (
            <div>
                <Navbar className="navbar navbar-dark bg-primary">
                    <Navbar.Brand href="#home">
                       Data Playground
                    </Navbar.Brand>
                </Navbar>
                <Container fluid={true}>

                    <Row>
                        <Col xs="2">{menus}</Col>
                        <Col xs="10">{main}</Col>
                    </Row>
                </Container>
            </div>

        );
    }

    private getNavigations(): React.ReactNode {
        let menus = (
            <>
                <Navigation
                    // you can use your own router's api to get pathname
                    activeItemId="/management/members"
                    onSelect={this.onMenuItemSelect.bind(this)}
                    items={[
                        {
                            title: 'Home',
                            itemId: '/home',
                            //   // you can use your own custom Icon component as well
                            //   // icon is optional
                            //   elemBefore: () => <Icon name="inbox" />,
                        },
                        {
                            title: 'Query',
                            itemId: '/query'
                        },
                        {
                            title: 'Model',
                            itemId: '/model',
                            subNav: [
                                {
                                    title: 'Catalogs',
                                    itemId: '/model/catalogs',
                                },
                                {
                                    title: 'Tables',
                                    itemId: '/model/tables',
                                },
                                {
                                    title: 'Computed Tables',
                                    itemId: '/model/computed-tables',
                                },
                            ],
                        },
                        {
                            title: 'Dashboards',
                            itemId: '/dashboards'
                        }
                    ]}
                />
            </>
        );

        return menus;
    }

    executeSql(sql: string) {
        console.log('Executing sql ' + sql);

        let newState: IPlayGroundState = {
            currentSql: sql,
            executing: true
        };
        this.setState(newState);

        this.service.executeSql(sql).then(data => {
            let newState: IPlayGroundState = {
                currentSql: sql,
                executing: false,
                queryData: data
            };

            this.setState(newState);

        }).catch(error => {
            let newState: IPlayGroundState = {
                currentSql: sql,
                executing: false,
                error: error.message
            };

            this.setState(newState);
        });

    }

    public onMenuItemSelect(selectedItem: { itemId: string }) {
        console.log('Selected item ' + selectedItem.itemId);
    }

}