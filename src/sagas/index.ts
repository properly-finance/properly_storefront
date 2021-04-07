import { all, takeEvery } from "redux-saga/effects"
import { HANDSHAKE_WALLET_PENDING } from "@emmpair/actions/wallet"
import { handshakeWallet } from "./wallet"
import { COLLATERAL_PENDING, WITHDRAW_PENDING } from "@emmpair/actions/deposit"
import { collaterateDeposit, withdrawDeposit } from "./deposit"
import { MINT_PENDING, BURN_PENDING, APPROVE_BURN_PENDING } from "@emmpair/actions/token"
import { mintToken, burnToken, approveBurnToken } from "./token"
import { FETCH_FARMS_PENDING } from "@emmpair/actions/farm"
import { fetchFarms } from "./farm"


function* rootSaga() {
  yield all([
    takeEvery(HANDSHAKE_WALLET_PENDING, handshakeWallet),
    takeEvery(COLLATERAL_PENDING, collaterateDeposit),
    takeEvery(WITHDRAW_PENDING, withdrawDeposit),
    takeEvery(MINT_PENDING, mintToken),
    takeEvery(BURN_PENDING, burnToken),
    takeEvery(APPROVE_BURN_PENDING, approveBurnToken),
    takeEvery(FETCH_FARMS_PENDING, fetchFarms),    
  ])
}

export default rootSaga
