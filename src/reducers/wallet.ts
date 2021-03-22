import { createSlice } from '@reduxjs/toolkit'


export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    account: undefined,
    network: undefined,
    balance: undefined,    
    handshake: 'idle',
  },
  reducers: {
    walletHandshakeAction(state) {
      if (['idle', 'reject', 'error'].includes(state.handshake) ) {
        state.handshake = 'pending'
      }
    },
    walletHandshakeSuccessAction(state) {
      if (state.handshake === 'pending') {
        state.handshake = 'idle'
      }
    },
    walletHandshakeRejectAction(state) {
      if (state.handshake === 'pending') {
        state.handshake = 'reject'
      }
    },
    walletHandshakeErrorAction(state) {
      if (state.handshake === 'pending') {
        state.handshake = 'error'
      }
    },
    walletAccountAction(
      state, 
      { payload: { account, network, balance } }
    ) {
      if (state.handshake === 'pending') {      
        if (account) {
          state.account = account
          state.network = network
          state.balance = balance
          state.handshake = 'idle'          
      }}
    }
  }
})

const { actions, reducer } = walletSlice
export const { walletHandshakeAction } = actions
export const { walletHandshakeSuccessAction } = actions
export const { walletHandshakeRejectAction } = actions
export const { walletHandshakeErrorAction } = actions
export const { walletAccountAction } = actions
export default reducer
