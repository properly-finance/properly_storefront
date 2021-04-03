import { combineReducers } from 'redux'
import walletReducer from './wallet'
import cnmReducer from "./cnm"


const rootReducer = combineReducers({
  wallet: walletReducer,
  cnm: cnmReducer,
})

export default rootReducer