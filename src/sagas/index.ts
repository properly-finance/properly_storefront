import { all, takeEvery } from "redux-saga/effects"
import { walletHandshakeAction } from "@emmpair/reducers/wallet"
import { collateralizeEthAction } from "@emmpair/reducers/contract"
import { handshakeWallet } from "./wallet"
import { collateralizeEth } from "./contract"


function* rootSaga() {
  yield all([
    function* () { 
      yield takeEvery(walletHandshakeAction, handshakeWallet)
    }(),
    function* () { 
      yield takeEvery(collateralizeEthAction, collateralizeEth)
    }(),    
  ])
}

export default rootSaga
