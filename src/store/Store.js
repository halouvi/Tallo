import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { boardReducer } from './board/BoardReducer'
import {userReducer} from './user/UserReducer';

const rootReducer = combineReducers({
  userReducer,
  boardReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
