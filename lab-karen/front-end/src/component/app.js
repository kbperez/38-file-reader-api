import React from 'react';
import Navbar from './navbar';
import Dashboard from './dashboard';
import Landing from './landing';
import {Provider} from 'react-redux';
import createStore from '../lib/app-create-store';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

const store = createStore();

export default class App extends React.Component {
  componentWillMount() {
    if(localStorage.token)
      store.dispatch({type: 'TOKEN_SET', payload: localStorage.token})
  }


  render() {
    let {token} = store.getState();
    return (
      <main className="application">
        <Provider store={store}>
          <BrowserRouter>
            <React.Fragment>
              <Navbar token={token}/>
              <Route exact path="/welcome/:auth" component={props =>
                token ? <Redirect to="/dashboard"/> : <Landing {...props}/>}/>
              <Route exact path="/dashboard" component={() =>
                  token
                  ? <Dashboard token={token}/>
                  : <Redirect to="/welcome/signup"/>}
                />
            </React.Fragment>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
}
