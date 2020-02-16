import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Home from './home/Home';

const PrivateRouter: React.SFC<{}> = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/post" component={() => <h1>POST</h1>} />
        <Route exact path="/profile" component={() => <h1>PROFILE</h1>} />
      </Switch>
      <Footer />
    </>
  );
};

export default PrivateRouter;