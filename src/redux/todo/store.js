import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import { todoReducer } from './todoReducer';

const store = createStore(todoReducer, applyMiddleware(logger));
export default store;