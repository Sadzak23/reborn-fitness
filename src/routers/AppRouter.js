import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import FullScreenRoute from './FullScreenRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
// App
import LoginPage from '../components/LoginPage.js';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage'
// Timer
import Timer from '../components/timers/Timer';
import TimersList from '../components/timers/TimersList'
import CreateTimerPage from '../components/timers/CreateTimerPage';
import EditTimerPage from '../components/timers/EditTimerPage';
// 5x5
import Dashboard5x5 from '../components/5x5/Dashboard5x5';
import History5x5 from '../components/5x5/History5x5';
import WorkoutPage from '../components/5x5/WorkoutPage';
// User
import CreateUserPage from '../components/Users/CreateUserPage';
import UsersList from '../components/Users/UsersList';
import EditUserPage from '../components/Users/EditUserPage';
import UserSelect from '../components/Users/UserSelect';
// Calculator
import CalCalculator from '../components/CalCalculator/CalCalculator';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/create-user" component={CreateUserPage} />
        <PrivateRoute path="/users" component={UsersList} />
        <PrivateRoute path="/edit-user/:id" component={EditUserPage} />
        <PrivateRoute path="/timers" component={TimersList} />
        <FullScreenRoute path="/timer/:id" component={Timer} />
        <PrivateRoute path="/create-timer" component={CreateTimerPage} />
        <PrivateRoute path="/edit-timer/:id" component={EditTimerPage} />
        <PrivateRoute path="/dashboard5x5" component={Dashboard5x5} />
        <FullScreenRoute path="/workout5x5/:id" component={WorkoutPage} />
        <PrivateRoute path="/history5x5" component={History5x5} />
        <PrivateRoute path="/user-select-5x5" component={UserSelect} />
        <PrivateRoute path="/tool-cal/:id" component={CalCalculator} />
        <PrivateRoute path="/user-select-cal" component={UserSelect} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;