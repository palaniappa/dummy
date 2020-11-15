import React from 'react';
import { connect } from 'react-redux';
import { ApplicationRootState } from './store/ApplicationState';
import { Dispatch } from 'redux';
import Demo from './components/demo/demo';
import CatalogComponent from './components/catalog/catalogs';
import QueryComponent from './components/query/queryComponent';

const mapStateToProps = (state: ApplicationRootState) => {
  return { demo: state.demo };
}

const mapDispatcherToProps = (dispatch: Dispatch<any>) => {
  return {
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class App extends React.Component < ReduxType, {}> {
  
  public render() {
  
    return (
      <div>
        <Demo/>
        <CatalogComponent/> 
        <QueryComponent/> 
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }



//export default App;
