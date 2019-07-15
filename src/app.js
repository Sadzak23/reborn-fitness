import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase'
import AppRouter, { history } from './routers/AppRouter';
import { login, logout } from './actions/auth'
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage'
import { startSetTimers } from './actions/timers';
import { startSetUsers } from './actions/users';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((admin) => {
  if (admin) {
    store.dispatch(login(admin.uid, admin.displayName, admin.photoURL));
    store.dispatch(startSetUsers())
    store.dispatch(startSetTimers())
    .then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/')
  }
});