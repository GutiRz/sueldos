import * as React from "react";

import {HashRouter, Switch, Route} from 'react-router-dom'; 
import {LoginContainer} from './login';
import {TeamContainer} from './team';
import {AllTeamsContainer} from './allTeams';
import {Status} from './status/status';
import {Injuries} from './injuries/injuries';

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
        path="/teams/:teamCode"
        component={TeamContainer}
      />
      <Route
        path="/sueldos"
        component={AllTeamsContainer}
      />
      <Route 
        path="/status"
        component={Status}
      />
      <Route 
        path="/lesionados"
        component={Injuries}
      />
    </Switch>
  </HashRouter>
  )
}