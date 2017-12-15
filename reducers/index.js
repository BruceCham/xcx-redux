import { createStore, combineReducers } from './redux.min.js'
import counter from './counter'

export default createStore(combineReducers({
  counter: counter
})) 