import React from 'react';
import { Switch, Route } from 'react-router-dom';

const PrivateRouter: React.SFC<{}> = () => {
  return (
    <Switch>
      <Route exact path="/" component={() => <h1>HOME</h1>} />
      <Route exact path="/post" component={() => <h1>POST</h1>} />
      <Route exact path="/profile" component={() => <h1>PROFILE</h1>} />
    </Switch>
  );
};

export default PrivateRouter;