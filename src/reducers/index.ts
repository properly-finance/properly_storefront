import { combineReducers } from 'redux'
import walletReducer from './wallet'
import depositReducer from "./deposit"
import tokenReducer from "./token"

const rootReducer = combineReducers({
  wallet: walletReducer,
  deposit: depositReducer,
  token: tokenReducer,
})

export default rootReducer