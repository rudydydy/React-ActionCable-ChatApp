import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const reduxMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(thunkMiddleware);
  } else {
    return applyMiddleware(thunkMiddleware, loggerMiddleware);
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
  reduxMiddleware()
));

export default store;
