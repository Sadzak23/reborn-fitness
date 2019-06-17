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
import { createTimer } from './actions/timers';

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

store.dispatch(createTimer({
  id: "123",
  name: "Timer 1",
  warmupTime: 0,
  cooldownTime: 0,
  intervals: [{
    id: "1234",
    intervalName: "Vezba 1",
    intervalMin: 1,
    intervalSec: 5,
    intervalType: "exercise",
    intervalColor: "#2bd99f"
  },{
    id: "2",
    intervalName: "Pauza",
    intervalMin: 0,
    intervalSec: 6,
    intervalType: "rest",
    intervalColor: "#1dc4f2"
  },{
    id: "3",
    intervalName: "Vezba 2",
    intervalMin: 2,
    intervalSec: 4,
    intervalType: "exercise",
    intervalColor: "#63d313"
  },]
}));

store.dispatch(createTimer({
  id: "321",
  name: "Timer 2",
  warmupTime: 3,
  cooldownTime: 0,
  intervals: [{
    id: "5",
    intervalName: "V1",
    intervalMin: 1,
    intervalSec: 4,
    intervalType: "exercise",
    intervalColor: "#2bd99f"
  },{
    id: "6",
    intervalName: "Pauza",
    intervalMin: 0,
    intervalSec: 5,
    intervalType: "rest",
    intervalColor: "#cccccc"
  },{
    id: "7",
    intervalName: "V2",
    intervalMin: 0,
    intervalSec: 6,
    intervalType: "exercise",
    intervalColor: "#d45c5c"
  },]
}));

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid, user.displayName, user.photoURL));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/')
  }
});