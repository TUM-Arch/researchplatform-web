import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

let store = createStore(rootReducer, applyMiddleware(thunk))

console.log(store.getState().mainPage)

export default store;