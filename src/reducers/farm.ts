import { createReducer } from '@reduxjs/toolkit'
import { TFarmState } from "./types"
import { FETCH_FARMS_PENDING, 
         FETCH_FARMS_REJECT,
         FETCH_FARMS_ERROR,
         FETCH_FARMS_SUCCESS,
         FetchFarmsSuccess } from "@emmpair/actions/farm"

const initialState: TFarmState = {
  txFetchFarmsStatus: 'idle',
  txCreateFarmStatus: 'idle',
  txUpdateFarmStatus: 'idle',
  txDeleteFarmStatus: 'idle', 
  farms:[],
  limit: 10,
  offset: 0,
  farmsCount: undefined
}

const farmReducer = createReducer(initialState, (builder) => {
  builder

  .addCase(FETCH_FARMS_PENDING, (state: TFarmState) => {
    const { txFetchFarmsStatus } = state
    if (['idle', 'reject', 'error'].includes(txFetchFarmsStatus) ) {
      state.txFetchFarmsStatus = 'pending'
    }
  })
  .addCase(FETCH_FARMS_REJECT, (state: TFarmState) => {
    const { txFetchFarmsStatus } = state
    if (txFetchFarmsStatus === 'pending') {
      state.txFetchFarmsStatus = 'reject'
    }
  })
  .addCase(FETCH_FARMS_ERROR, (state: TFarmState) => {
    const { txFetchFarmsStatus } = state
    if (txFetchFarmsStatus === 'pending') {
      state.txFetchFarmsStatus = 'error'
    }
  })
  .addCase(FETCH_FARMS_SUCCESS, (
    state: TFarmState,
    action: FetchFarmsSuccess
  ) => {
    const { txFetchFarmsStatus } = state
    const { farms, farmsCount } = action.payload
    state.farms = farms
    state.farmsCount = farmsCount
    if (txFetchFarmsStatus === 'pending') {
      state.txFetchFarmsStatus = 'idle'
    }
  })
})


export default farmReducer