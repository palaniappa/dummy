import React from 'react';
import { connect } from 'react-redux';
import { ApplicationRootState } from './store/ApplicationState';
import { Dispatch } from 'redux';
//import Demo from './components/demo/demo';
import CatalogComponent from './components/catalog/catalogs';
import QueryComponent from './components/query/queryComponent';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBNavbar, MDBNavbarBrand, MDBContainer, MDBRow, MDBCol, MDBJumbotron } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { PlayGroundAppActions, selectMenuItem } from './store/playGroundApp/playGroundActions';
import LoginComponent from './components/login/loginComponent';

interface IPlayGroundAppStateProps {
  currentMenuItem: String;
  userName?: string;
}

const mapStateToProps = (state: ApplicationRootState): IPlayGroundAppStateProps => {
  return { currentMenuItem: state.playGroundApp.currentMenuItem
    , userName: state.playGroundApp.userName 
  };
}

const mapDispatcherToProps = (dispatch: Dispatch<PlayGroundAppActions>) => {
  return {
    selectMenuItem: (selectedItem: string) => dispatch(selectMenuItem(selectedItem))
  }
}

type IPlayGroundAppProps = IPlayGroundAppStateProps & ReturnType<typeof mapDispatcherToProps>;

class App extends React.Component<IPlayGroundAppProps, {}> {

  public render() {

    let titleBar = this.getTitleBar();
    let menus = this.getNavigations();
    let menuSpecificItem = this.getCurrentMenuPage();

    return (
      <div>
        {titleBar}
        <MDBContainer fluid={true}>
          <MDBRow>
            <MDBCol md="2">{menus}</MDBCol>
            <MDBCol middle={false}>{menuSpecificItem}</MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }

  private getTitleBar() {
    return (
      <Router>
        <MDBNavbar className="navbar navbar-dark bg-primary">
          <MDBNavbarBrand href="#home">
            <img
              src="/DataPandaSmall.png"
              width="10%"
              height="10%"
              className="d-inline-block align-top"
              alt="Data Panda"
            />
            <strong className="white-text"> Data Panda</strong>
          </MDBNavbarBrand>
        </MDBNavbar>
      </Router>
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

  private onMenuItemSelect(selectedItem: { itemId: string }) {
    this.props.selectMenuItem(selectedItem.itemId);
    console.log('Selected item ' + selectedItem.itemId);
  }

  private getCurrentMenuPage() {
    let menuItem = this.props.currentMenuItem;
    if (!this.props.userName) {
        menuItem = "/home";
    }

    if (menuItem == "/query") {
      return <QueryComponent />;
    } else if (menuItem == '/home') {
      return this.getHomeComponent();
    } else if (menuItem == '/model/catalogs') {
      return <CatalogComponent />;
    }
  }

  private getHomeComponent(): React.ReactNode {
    let userName = this.props.userName ? this.props.userName : "Guest";

    let login = <LoginComponent />;
    let welcomeComponent =
      (<MDBJumbotron>
        <MDBContainer className="text-center">
          <h1>Welcome <b>{userName}</b> to the <b>Data Panda!</b></h1>
          <br></br>
          <p>Bigdata analytics for everyone. Happy exploring.</p>
          <br></br>
          <br></br>
          {login}
        </MDBContainer>
      </MDBJumbotron>);

    return (

      <MDBContainer fluid={true}>
        {welcomeComponent}
      </MDBContainer>
    );
  }

}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
