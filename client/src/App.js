import * as React from "react";

import {HashRouter, Switch, Route} from 'react-router-dom'; 
import {LoginContainer} from './login';
import {TeamContainer} from './team';
import {AllTeamsContainer} from './allTeams';

export const App = () => {
  return (
    <HashRouter>
    <Switch>
      <Route
        exact={true}
        path="/"
        component={AllTeamsContainer} 
      />
      <Route
        path="/:teamCode"
        component={TeamContainer}
      />
      <Route
        path="/sueldos"
        component={AllTeamsContainer}
      />
    </Switch>
  </HashRouter>
  )
}