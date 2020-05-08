import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GamePanel from './Components/GamePanel/GamePanel';
import WinnersList from './Components/WinnersList';
import AboutGame from './Components/AboutGame';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={AboutGame} />
      <Route path="/game" component={GamePanel} />
      <Route path="/winners" component={WinnersList} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Router;
