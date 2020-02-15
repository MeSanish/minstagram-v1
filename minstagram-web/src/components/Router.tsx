import React from 'react';

import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from './login/Login';
import PrivateRouter from './private/Router';
import PublicRoute from './common/PublicRoute';
import PrivateRoute from './common/PrivateRoute';

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute path="/" component={PrivateRouter} />
      </Switch>
    </Router>
  )
}

export default AppRouter;