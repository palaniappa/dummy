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
import { LoginComponent } from './LoginComponent';


export interface IPlayGroundProps {

}

export interface IPlayGroundState {
    currentSql: string;
    executing: boolean;
    queryData?: QueryResult;
    error?: string;
    loggedInUserEmail?: string;
    loggedInUserName?: string;
    currentMenuItem: string;
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
            , loggedInUserEmail: undefined
            , loggedInUserName: undefined
            , currentMenuItem: '/home'

        };
        this.service = PlayGroundService.getInstance();
    }

    render(): React.ReactNode {

        let menuSpecificItem = this.getCurrentMenuPage();

        let menus = this.getNavigations();

        return (
            <div>
                <Navbar className="navbar navbar-dark bg-primary">
                    <Navbar.Brand href="#home">
                        <img
                            src="/datapanda.png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Data Panda"
                        />
                       <span>        Data Panda</span>
                    </Navbar.Brand>
                </Navbar>
                <Container fluid={true}>
                    <Row>
                        <Col xs="2">{menus}</Col>
                        <Col xs="10">{menuSpecificItem}</Col>
                    </Row>
                </Container>
            </div>

        );
    }

    private getCurrentMenuPage() {
        let menuItem = this.state.currentMenuItem;
        if(!this.state.loggedInUserName) {
            menuItem = "/home";
        }

        if (menuItem == "/query") {
            return this.getQueryExecutionComponent();
        } else if (menuItem == '/home') {
            return this.getHomeComponent();
        }

    }

    private getHomeComponent(): React.ReactNode {
        return <LoginComponent 
        userName={this.state.loggedInUserName} 
        onLoginError={this.onLoginFailure.bind(this)} 
        onLoginSuccess={this.onLoginSuccess.bind(this)}
        onLogout={this.onLogout.bind(this)}
        />;
    }

    private getQueryExecutionComponent(): React.ReactNode {
        let errorMessage;
        let resultTable;
        if (this.state.error) {
            errorMessage = <span>{this.state.error}</span>
        }
        else if (this.state.queryData) {
            resultTable = <QueryResultComponent result={this.state.queryData} />
        }

        return (
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

        let newState = { ...this.state, executing: true, currentSql: sql };
        this.setState(newState);

        this.service.executeSql(sql).then(data => {
            let newState = { ...this.state, queryData: data, executing: false, error: undefined };
            this.setState(newState);

        }).catch(error => {
            let newState = { ...this.state, error: error.message, executing: false };
            this.setState(newState);
        });

    }

    public onMenuItemSelect(selectedItem: { itemId: string }) {
        this.setState({ ...this.state, currentMenuItem: selectedItem.itemId });
        console.log('Selected item ' + selectedItem.itemId);
    }

    public onLoginSuccess(userName: string, userEmail: string) {
        console.log('Login success ' + userEmail);
        this.setState({...this.state, loggedInUserEmail:userEmail, loggedInUserName:userName});
    }

    public onLoginFailure(error: string) {
        console.log('Login failed ' + error);
        this.setState({...this.state, loggedInUserName:undefined, loggedInUserEmail: undefined});
    }

    public onLogout() {
        this.setState({...this.state, loggedInUserName:undefined, loggedInUserEmail: undefined});
    }
}