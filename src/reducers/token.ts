// import { TAction } from "@emmpair/types"
import { TTokenState } from "./types"
import { createReducer } from '@reduxjs/toolkit'
import { UpdateTokenInfoRequestAction, 
         MintSuccessAction,
         BurnSuccessAction } from "@emmpair/actions/token"
import { UPDATE_TOKEN_INFO_REQUEST,
         MINT_PENDING, MINT_REJECT, MINT_ERROR, MINT_SUCCESS,
         BURN_PENDING, BURN_REJECT, BURN_ERROR, BURN_SUCCESS } from "@emmpair/actions/token"

const initialState: TTokenState = {
  txMintStatus: 'idle',
  txBurnStatus: 'idle',
  balance: undefined,
}

const tokenReducer = createReducer(initialState, (builder) => {
  builder

  .addCase(UPDATE_TOKEN_INFO_REQUEST, ( 
    state: TTokenState,
    action: UpdateTokenInfoRequestAction
  ) => {
    const { balance } = action.payload
    state.balance = balance
  }) 

  .addCase(MINT_PENDING, (state: TTokenState) => {
    const { txMintStatus } = state
    if (['idle', 'reject', 'error'].includes(txMintStatus) ) {
      state.txMintStatus = 'pending'
    }
  })
  .addCase(MINT_REJECT, (state: TTokenState) => {
    const { txMintStatus } = state
    if (txMintStatus === 'pending') {
      state.txMintStatus = 'reject'
    }
  })
  .addCase(MINT_ERROR, (state: TTokenState) => {
    const { txMintStatus } = state
    if (txMintStatus === 'pending') {
      state.txMintStatus = 'error'
    }
  })
  .addCase(MINT_SUCCESS, (state: TTokenState, action: MintSuccessAction) => {
    const { txMintStatus } = state
    const { balance } = action.payload
    state.balance = balance
    if (txMintStatus === 'pending') {
      state.txMintStatus = 'idle'
    }
  })

  .addCase(BURN_PENDING, (state: TTokenState) => {
    const { txBurnStatus } = state
    if (['idle', 'reject', 'error'].includes(txBurnStatus) ) {
      state.txBurnStatus = 'pending'
    }
  })
  .addCase(BURN_REJECT, (state: TTokenState) => {
    const { txBurnStatus } = state
    if (txBurnStatus === 'pending') {
      state.txBurnStatus = 'reject'
    }
  })
  .addCase(BURN_ERROR, (state: TTokenState) => {
    const { txBurnStatus } = state
    if (txBurnStatus === 'pending') {
      state.txBurnStatus = 'error'
    }
  })
  .addCase(BURN_SUCCESS, (state: TTokenState, action: BurnSuccessAction) => {
    const { txBurnStatus } = state
    const { balance  } = action.payload
    state.balance  = balance 
    if (txBurnStatus === 'pending') {
      state.txBurnStatus = 'idle'
    }
  })  
})


export default tokenReducer