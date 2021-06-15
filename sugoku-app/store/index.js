import { createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

function logger(store) {
  return function(next) {
    return function(action) {
      next(action)
    }
  }
}

const store = createStore(reducer, applyMiddleware(logger, thunk))
export default store