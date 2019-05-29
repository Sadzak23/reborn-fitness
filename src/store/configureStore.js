import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import timersReducer from '../reducers/timers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      timers: timersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};