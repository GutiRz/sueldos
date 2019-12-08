import * as React from "react";
import * as ReactDOM from "react-dom";

import {HashRouter, Switch, Route} from 'react-router-dom'; 
import {LoginContainer} from './login';
import {TeamContainer} from './team';

ReactDOM.render(
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
  </HashRouter>,
  document.getElementById("root")
);
