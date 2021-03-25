import { createSlice } from '@reduxjs/toolkit'


export const contractSlice = createSlice({
  name: 'contract',
  initialState: {
    txStatus: 'idle',
    collateralBalance: undefined,
    collateralUsed: undefined,
    borrowLimit: undefined,
  },
  reducers: {
    collateralAction(state, { payload: {
        collateralBalance,
        collateralUsed,
        borrowLimit,
    }}) {
      state.collateralBalance = collateralBalance
      state.collateralUsed = collateralUsed
      state.borrowLimit = borrowLimit
      if (state.txStatus === 'pending') {
        state.txStatus = 'idle'
      }      
    },
    collateralizeEthAction(state, _action) {
      if (['idle', 'reject', 'error'].includes(state.txStatus) ) {
        state.txStatus = 'pending'
      }      
    },
    collateralizeEthSuccessAction(state) {
      if (state.txStatus === 'pending') {
        state.txStatus = 'idle'
      }
    },
    collateralizeEthRejectAction(state) {
      if (state.txStatus === 'pending') {
        state.txStatus = 'reject'
      }
    },
    collateralizeEthErrorAction(state) {
      if (state.txStatus === 'pending') {
        state.txStatus = 'error'
      }
    },    

  }
})

const { actions, reducer } = contractSlice
export const { 
  collateralAction,
  collateralizeEthAction,
  collateralizeEthSuccessAction,
  collateralizeEthRejectAction,
  collateralizeEthErrorAction } = actions
export default reducer
