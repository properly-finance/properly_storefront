import { TAction } from "@emmpair/types"
import { TWalletState } from "./types"
import { createReducer } from '@reduxjs/toolkit'
import  {
  HANDSHAKE_WALLET_PENDING,
  HANDSHAKE_WALLET_REJECT,
  HANDSHAKE_WALLET_ERROR,
  HANDSHAKE_WALLET_SUCCESS,
  UPDATE_WALLET_REQUEST } from "@emmpair/actions/wallet"
import { UpdateWalletRequestAction } from  "@emmpair/actions/wallet"


const initialState: TWalletState = {
  hsStatus: 'idle',
  account: undefined,
  network: undefined,
  balance: undefined,
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
  .addCase(HANDSHAKE_WALLET_SUCCESS, (state: TWalletState, action: TAction) => {
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
  .addCase(UPDATE_WALLET_REQUEST, (
    state: TWalletState,
    action: UpdateWalletRequestAction
  ) => {
    const { balance } = action.payload
    state.balance = balance
  })  
})


export default walletReducer