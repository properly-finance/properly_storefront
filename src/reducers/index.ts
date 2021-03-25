import { combineReducers } from 'redux'
import walletReducer from './wallet'
import contractSlice from "./contract"


const rootReducer = combineReducers({
  wallet: walletReducer,
  contract: contractSlice,
})

export default rootReducer