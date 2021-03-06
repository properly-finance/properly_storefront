import { all, takeEvery } from "redux-saga/effects"
import { HANDSHAKE_WALLET_PENDING, FETCH_PRICE_TOKEN_WALLET_PENDING } from "@emmpair/actions/wallet"
import { handshakeWallet, getPriceTokenWallet } from "./wallet"
import { COLLATERAL_PENDING, WITHDRAW_PENDING } from "@emmpair/actions/deposit"
import { collaterateDeposit, withdrawDeposit } from "./deposit"
import { MINT_PENDING, BURN_PENDING, APPROVE_BURN_PENDING } from "@emmpair/actions/token"
import { mintToken, burnToken, approveBurnToken } from "./token"
import { FETCH_FARMS_PENDING,
         INCREASE_FARM_TOKEN_ALLOWANCE_PENDING,
         DEPOSIT_FARM_PENDING,
         WITHDRAW_FARM_PENDING } from "@emmpair/actions/farm"
import { fetchFarms,
         increaseAllowanceTokenFarm,
         depositFarm,
         withdrawFarm } from "./farm"

function* rootSaga() {
  yield all([
    takeEvery(HANDSHAKE_WALLET_PENDING, handshakeWallet),
    takeEvery(FETCH_PRICE_TOKEN_WALLET_PENDING, getPriceTokenWallet),
    takeEvery(COLLATERAL_PENDING, collaterateDeposit),
    takeEvery(WITHDRAW_PENDING, withdrawDeposit),
    takeEvery(MINT_PENDING, mintToken),
    takeEvery(BURN_PENDING, burnToken),
    takeEvery(APPROVE_BURN_PENDING, approveBurnToken),
    takeEvery(FETCH_FARMS_PENDING, fetchFarms),
    takeEvery(INCREASE_FARM_TOKEN_ALLOWANCE_PENDING, increaseAllowanceTokenFarm),
    takeEvery(DEPOSIT_FARM_PENDING, depositFarm),
    takeEvery(WITHDRAW_FARM_PENDING, withdrawFarm),    
  ])
}

export default rootSaga
