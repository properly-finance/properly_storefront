import { all, takeEvery } from "redux-saga/effects"
import { walletHandshakeAction } from "@emmpair/reducers/wallet"
import { handshakeWallet } from "./wallet"


function* rootSaga() {
  yield all([
    function* watchHandshakeWallet() { 
      yield takeEvery(walletHandshakeAction, handshakeWallet)
    }(),
  ])
}

export default rootSaga
