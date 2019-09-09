import { createStore } from 'redux'
import rootReducer from './reducers/index'

let store = createStore(rootReducer)

//store.dispatch({ type: 'INCREMENT' })

export default store;