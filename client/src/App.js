import * as React from "react";

import {HashRouter, Switch, Route} from 'react-router-dom'; 
import {LoginContainer} from './login';
import {TeamContainer} from './team';

export const App = () => {
  return (
    <HashRouter>
    <Switch>
      <Route
        exact={true}
        path="/"
        component={LoginContainer} 
      />
      <Route
        path="/:teamCode"
        component={TeamContainer}
      />
    </Switch>
  </HashRouter>
  )
}