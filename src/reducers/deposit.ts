// import { TAction } from "@emmpair/types"
import { TDepositState } from "./types"
import { createReducer } from '@reduxjs/toolkit'
import { 
  UpdateDepositInfoRequestAction,
  CollateralSuccessAction,
  WithdrawSuccessAction } from "@emmpair/actions/deposit"
import {
  UPDATE_DEPOSIT_INFO_REQUEST,
  COLLATERAL_PENDING, COLLATERAL_REJECT, COLLATERAL_ERROR, COLLATERAL_SUCCESS,
  WITHDRAW_PENDING, WITHDRAW_REJECT, WITHDRAW_ERROR, WITHDRAW_SUCCESS } from "@emmpair/actions/deposit"

const initialState: TDepositState = {
  txCollateralStatus: 'idle',
  txWithdrawStatus: 'idle',
  collateralBalance: undefined,
  collateralUsed: undefined,
  borrowLimit: undefined,
}

const depositReducer = createReducer(initialState, (builder) => {
  builder

  .addCase(UPDATE_DEPOSIT_INFO_REQUEST, (
    state: TDepositState,
    action: UpdateDepositInfoRequestAction
  ) => {
    const { collateralBalance, collateralUsed, borrowLimit } = action.payload
    state.collateralBalance = collateralBalance
    state.collateralUsed = collateralUsed
    state.borrowLimit = borrowLimit    
  })

  // ===========================================

  .addCase(COLLATERAL_PENDING, (state: TDepositState) => {
    const { txCollateralStatus } = state
    if (['idle', 'reject', 'error'].includes(txCollateralStatus) ) {
      state.txCollateralStatus = 'pending'
    }
  })
  .addCase(COLLATERAL_REJECT, (state: TDepositState) => {
    const { txCollateralStatus } = state
    if (txCollateralStatus === 'pending') {
      state.txCollateralStatus = 'reject'
    }
  })
  .addCase(COLLATERAL_ERROR, (state: TDepositState) => {
    const { txCollateralStatus } = state
    if (txCollateralStatus === 'pending') {
      state.txCollateralStatus = 'error'
    }
  })
  .addCase(COLLATERAL_SUCCESS, (
    state: TDepositState,
    action: CollateralSuccessAction
  ) => {
    const { txCollateralStatus } = state
    const { collateralBalance, collateralUsed, borrowLimit } = action.payload
    state.collateralBalance = collateralBalance
    state.collateralUsed = collateralUsed
    state.borrowLimit = borrowLimit    
    if (txCollateralStatus === 'pending') {
      state.txCollateralStatus = 'idle'
    }
  })

  // ===========================================

  .addCase(WITHDRAW_PENDING, (state: TDepositState) => {
    const { txWithdrawStatus } = state
    if (['idle', 'reject', 'error'].includes(txWithdrawStatus) ) {
      state.txWithdrawStatus = 'pending'
    }
  })
  .addCase(WITHDRAW_REJECT, (state: TDepositState) => {
    const { txWithdrawStatus } = state
    if (txWithdrawStatus === 'pending') {
      state.txWithdrawStatus = 'reject'
    }
  })
  .addCase(WITHDRAW_ERROR, (state: TDepositState) => {
    const { txWithdrawStatus } = state
    if (txWithdrawStatus === 'pending') {
      state.txWithdrawStatus = 'error'
    }
  })
  .addCase(WITHDRAW_SUCCESS, (
    state: TDepositState,
    action: WithdrawSuccessAction
  ) => {
    const { txWithdrawStatus } = state
    const { collateralBalance, collateralUsed, borrowLimit } = action.payload
    state.collateralBalance = collateralBalance
    state.collateralUsed = collateralUsed
    state.borrowLimit = borrowLimit    
    if (txWithdrawStatus === 'pending') {
      state.txWithdrawStatus = 'idle'
    }
  })  
})


export default depositReducer