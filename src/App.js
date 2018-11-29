import React, { Component } from 'react';
import LayOut from './container/layout'
import Login from './container/login'
import {Route,Switch} from 'react-router-dom'


class App extends Component {
  render() {
    return (
        <div>
            <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' exact component={Login} />
            <Route component={LayOut} />
            </Switch>
        </div>
    );
  }
}

export default App;
