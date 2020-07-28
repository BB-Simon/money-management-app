import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const middlewere = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewere),  
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;