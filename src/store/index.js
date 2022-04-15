import { applyMiddleware, createStore } from 'redux';
import createActionWatchMiddleware from 'redux-action-watch/lib/middleware';
import createSagaMiddleware from 'redux-saga';
import apiClient from '_services/apiClient';
import { createVerifySessionMiddleware } from './middlewares';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const actionWatchMiddleware = createActionWatchMiddleware('watcher');
const verifySessionMiddleware = createVerifySessionMiddleware(apiClient);

const middlewares = [verifySessionMiddleware, actionWatchMiddleware, sagaMiddleware];

if (__DEV__) {
  const reduxFlipperMiddleware = require('redux-flipper').default;
  middlewares.push(reduxFlipperMiddleware());
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
