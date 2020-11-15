import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as asyncactions from '../../store/demo/async-actions';
import { DemoActions, IDemoState } from '../../store/demo/types';
import { ApplicationRootState } from '../../store/ApplicationState';

const mapStateToProps = ( state : ApplicationRootState ) => {
    return {
        demo: state.demo
    };
  }
  
  const mapDispatcherToProps = (dispatch: Dispatch<DemoActions>) => {
    return {
      addItem: (item: string) => asyncactions.addItemAsync(dispatch, item)
    }
  }
  
  type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;
  
  interface IState {
    inputText: string
  }
  
  class Demo extends React.Component < ReduxType, IState> {
    public state: IState = {
      inputText: ''
    }
  
    public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({inputText: e.target.value});
    }
  
    public onAddClick = () => {
      this.props.addItem(this.state.inputText);
      this.setState({inputText: ''});
    }
  
    public render() {
  
      return (
        <div style={{margin: '20px'}}>
          <input value={this.state.inputText} onChange={this.onInputChange}/>
          <button onClick={this.onAddClick}>Add</button>
          {this.props.demo.loading && <div>Loading...</div>}
          <ul>
            {this.props.demo.list.map( l => <li key={l}>{l}</li>)}
          </ul>
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps, mapDispatcherToProps)(Demo);