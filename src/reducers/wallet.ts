import { TWalletState } from "./types"
import { createReducer } from '@reduxjs/toolkit'
import  {
  HANDSHAKE_WALLET_PENDING,
  HANDSHAKE_WALLET_REJECT,
  HANDSHAKE_WALLET_ERROR,
  HANDSHAKE_WALLET_SUCCESS,
  HandshakeWalletSuccessAction } from "@emmpair/actions/wallet"
import { 
  UPDATE_WALLET_REQUEST,
  UpdateWalletRequestAction } from "@emmpair/actions/wallet"
import {
  FETCH_PRICE_TOKEN_WALLET_PENDING,
  FETCH_PRICE_TOKEN_WALLET_REJECT,
  FETCH_PRICE_TOKEN_WALLET_ERROR,
  FETCH_PRICE_TOKEN_WALLET_SUCCESS,
  fetchPriceTokenWalletSuccessAction } from "@emmpair/actions/wallet"

const initialState: TWalletState = {
  hsStatus: 'idle',
  fetchPriceTokenStatus: 'idle',
  account: undefined,
  network: undefined,
  balance: undefined,
  priceToken: undefined,  
}

const walletReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(HANDSHAKE_WALLET_PENDING, (state: TWalletState) => {
    const { hsStatus } = state
    if (['idle', 'reject', 'error'].includes(hsStatus) ) {
      state.hsStatus = 'pending'
    }
  })
  .addCase(HANDSHAKE_WALLET_REJECT, (state: TWalletState) => {
    const { hsStatus } = state
    if (hsStatus === 'pending') {
      state.hsStatus = 'reject'
    }
  })
  .addCase(HANDSHAKE_WALLET_ERROR, (state: TWalletState) => {
    const { hsStatus } = state
    if (hsStatus === 'pending') {
      state.hsStatus = 'error'
    }
  })
  .addCase(HANDSHAKE_WALLET_SUCCESS, (
    state: TWalletState,
    action: HandshakeWalletSuccessAction,
  ) => {
    const { hsStatus } = state
    const { account, network, balance } = action.payload
    if (hsStatus === 'pending') {
      if (account) {
        state.account = account
        state.network = network
        state.balance = balance
        state.hsStatus = 'idle'
    }}
  })

  // ===========================================

  .addCase(UPDATE_WALLET_REQUEST, (
    state: TWalletState,
    action: UpdateWalletRequestAction
  ) => {
    const { balance } = action.payload
    state.balance = balance
  })

  // ===========================================

  .addCase(FETCH_PRICE_TOKEN_WALLET_PENDING, (state: TWalletState) => {
    const { fetchPriceTokenStatus } = state
    if (['idle', 'reject', 'error'].includes(fetchPriceTokenStatus) ) {
      state.fetchPriceTokenStatus = 'pending'
    }
  })
  .addCase(FETCH_PRICE_TOKEN_WALLET_REJECT, (state: TWalletState) => {
    const { fetchPriceTokenStatus } = state
    if (fetchPriceTokenStatus === 'pending') {
      state.fetchPriceTokenStatus = 'reject'
    }
  })
  .addCase(FETCH_PRICE_TOKEN_WALLET_ERROR, (state: TWalletState) => {
    const { fetchPriceTokenStatus } = state
    if (fetchPriceTokenStatus === 'pending') {
      state.fetchPriceTokenStatus = 'error'
    }
  })
  .addCase(FETCH_PRICE_TOKEN_WALLET_SUCCESS, (
    state: TWalletState,
    action: fetchPriceTokenWalletSuccessAction
  ) => {
    const { fetchPriceTokenStatus } = state
    const { price } = action.payload
    state.priceToken = price    
    if (fetchPriceTokenStatus === 'pending') {
      state.fetchPriceTokenStatus = 'idle'
    }
  })

})


export default walletReducer