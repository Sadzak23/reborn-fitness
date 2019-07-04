import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import timersReducer from '../reducers/timers';
import usersReducer from '../reducers/users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      timers: timersReducer,
      users: usersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};