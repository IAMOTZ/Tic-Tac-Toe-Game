import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';  // eslint-disable-line

let middlewares;
if (process.env.NODE_ENV !== 'production') {
  middlewares = applyMiddleware(logger);
}

export default createStore(reducers, middlewares);
