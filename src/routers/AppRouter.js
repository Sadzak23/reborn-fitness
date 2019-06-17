import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage.js';
import FullScreenRoute from './FullScreenRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Timer from '../components/timers/Timer';
import TimersList from '../components/timers/TimersList'
import CreateTimerPage from '../components/timers/CreateTimerPage';
import EditTimerPage from '../components/timers/EditTimerPage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <FullScreenRoute path="/timer/:id" component={Timer} />
        <PrivateRoute path="/timers" component={TimersList} />
        <PrivateRoute path="/create-timer" component={CreateTimerPage} />
        <PrivateRoute path="/edit-timer/:id" component={EditTimerPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;