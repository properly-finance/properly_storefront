import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import walletReducer from './wallet'
import depositReducer from "./deposit"
import tokenReducer from "./token"
import farmReducer from "./farm"

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  wallet: walletReducer,
  deposit: depositReducer,
  token: tokenReducer,
  farm: farmReducer,  
})

export default createRootReducer