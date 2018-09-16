import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';

export default () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/game" component={GamePage} />
  </Switch>
);
