import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './DzReducers';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
