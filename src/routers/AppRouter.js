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
import Dashboard5x5 from '../components/5x5/Dashboard5x5';
import History5x5 from '../components/5x5/History5x5';
import Workout5x5 from '../components/5x5/Workout5x5';

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
        <PrivateRoute path="/dashboard5x5" component={Dashboard5x5} />
        <PrivateRoute path="/history5x5" component={History5x5} />
        <FullScreenRoute path="/workout5x5" component={Workout5x5} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;