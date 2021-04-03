import { all, takeEvery } from "redux-saga/effects"
import { HANDSHAKE_WALLET_PENDING } from "@emmpair/actions/wallet"
import { COLLATERAL_PENDING, WITHDRAW_PENDING } from "@emmpair/actions/cnm"
import { handshakeWallet } from "./wallet"
import { collateralizeEth, withdrawCollateral } from "./cnm"


function* rootSaga() {
  yield all([
    takeEvery(HANDSHAKE_WALLET_PENDING, handshakeWallet),
    takeEvery(COLLATERAL_PENDING, collateralizeEth),
    takeEvery(WITHDRAW_PENDING, withdrawCollateral),
  ])
}

export default rootSaga
