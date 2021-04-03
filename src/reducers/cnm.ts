// import { TAction } from "@emmpair/types"
import { TCnmState } from "./types"
import { createReducer } from '@reduxjs/toolkit'
import { CollateralSuccessAction,
         WithdrawSuccessAction } from "@emmpair/actions/cnm"
import  {
  COLLATERAL_PENDING,
  COLLATERAL_REJECT,
  COLLATERAL_ERROR,
  COLLATERAL_SUCCESS } from "@emmpair/actions/cnm"
import  {
  WITHDRAW_PENDING,
  WITHDRAW_REJECT,
  WITHDRAW_ERROR,
  WITHDRAW_SUCCESS } from "@emmpair/actions/cnm"

const initialState: TCnmState = {
  txCollateralStatus: 'idle',
  txWithdrawStatus: 'idle',
  collateralBalance: undefined,
  collateralUsed: undefined,
  borrowLimit: undefined,
}

// ===========================================

const cnmReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(COLLATERAL_PENDING, (state: TCnmState) => {
    const { txCollateralStatus } = state
    if (['idle', 'reject', 'error'].includes(txCollateralStatus) ) {
      state.txCollateralStatus = 'pending'
    }
  })
  .addCase(COLLATERAL_REJECT, (state: TCnmState) => {
    const { txCollateralStatus } = state
    if (txCollateralStatus === 'pending') {
      state.txCollateralStatus = 'reject'
    }
  })
  .addCase(COLLATERAL_ERROR, (state: TCnmState) => {
    const { txCollateralStatus } = state
    if (txCollateralStatus === 'pending') {
      state.txCollateralStatus = 'error'
    }
  })
  .addCase(COLLATERAL_SUCCESS, (state: TCnmState, action: CollateralSuccessAction) => {
    const { txCollateralStatus } = state
    const { collateralBalance, collateralUsed, borrowLimit } = action.payload
    // ..
    state.collateralBalance = collateralBalance
    state.collateralUsed = collateralUsed
    state.borrowLimit = borrowLimit    
    if (txCollateralStatus === 'pending') {
      state.txCollateralStatus = 'idle'
    }
  })

  // ===========================================

  .addCase(WITHDRAW_PENDING, (state: TCnmState) => {
    const { txWithdrawStatus } = state
    if (['idle', 'reject', 'error'].includes(txWithdrawStatus) ) {
      state.txWithdrawStatus = 'pending'
    }
  })
  .addCase(WITHDRAW_REJECT, (state: TCnmState) => {
    const { txWithdrawStatus } = state
    if (txWithdrawStatus === 'pending') {
      state.txWithdrawStatus = 'reject'
    }
  })
  .addCase(WITHDRAW_ERROR, (state: TCnmState) => {
    const { txWithdrawStatus } = state
    if (txWithdrawStatus === 'pending') {
      state.txWithdrawStatus = 'error'
    }
  })
  .addCase(WITHDRAW_SUCCESS, (state: TCnmState, action: WithdrawSuccessAction) => {
    const { txWithdrawStatus } = state
    const { collateralBalance, collateralUsed, borrowLimit } = action.payload
    // ..
    state.collateralBalance = collateralBalance
    state.collateralUsed = collateralUsed
    state.borrowLimit = borrowLimit    
    if (txWithdrawStatus === 'pending') {
      state.txWithdrawStatus = 'idle'
    }
  })  
})


export default cnmReducer