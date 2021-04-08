import { createReducer } from '@reduxjs/toolkit'
import { TFarmState } from "./types"
import { 
  FETCH_FARMS_PENDING, 
  FETCH_FARMS_REJECT,
  FETCH_FARMS_ERROR,
  FETCH_FARMS_SUCCESS,
  FetchFarmsSuccess } from "@emmpair/actions/farm"
import { 
  INCREASE_FARM_TOKEN_ALLOWANCE_PENDING,
  INCREASE_FARM_TOKEN_ALLOWANCE_REJECT,
  INCREASE_FARM_TOKEN_ALLOWANCE_ERROR,
  INCREASE_FARM_TOKEN_ALLOWANCE_SUCCESS,
  IncreaseFarmTokenAllowanceSuccessAction } from "@emmpair/actions/farm"

const initialState: TFarmState = {
  txFetchFarmsStatus: 'idle',
  txIncreaseFarmTokenAllowanceStatus: 'idle',
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

  .addCase(INCREASE_FARM_TOKEN_ALLOWANCE_PENDING, (state: TFarmState) => {
    const { txIncreaseFarmTokenAllowanceStatus } = state
    if (['idle', 'reject', 'error'].includes(txIncreaseFarmTokenAllowanceStatus) ) {
      state.txIncreaseFarmTokenAllowanceStatus = 'pending'
    }
  })
  .addCase(INCREASE_FARM_TOKEN_ALLOWANCE_REJECT, (state: TFarmState) => {
    const { txIncreaseFarmTokenAllowanceStatus } = state
    if (txIncreaseFarmTokenAllowanceStatus === 'pending') {
      state.txIncreaseFarmTokenAllowanceStatus = 'reject'
    }
  })
  .addCase(INCREASE_FARM_TOKEN_ALLOWANCE_ERROR, (state: TFarmState) => {
    const { txIncreaseFarmTokenAllowanceStatus } = state
    if (txIncreaseFarmTokenAllowanceStatus === 'pending') {
      state.txIncreaseFarmTokenAllowanceStatus = 'error'
    }
  })
  .addCase(INCREASE_FARM_TOKEN_ALLOWANCE_SUCCESS, (
    state: TFarmState,
    action: IncreaseFarmTokenAllowanceSuccessAction
  ) => {
    const { txIncreaseFarmTokenAllowanceStatus } = state
    const { allowance, farmKey } = action.payload
    state.farms[farmKey].allowance = allowance
    if (txIncreaseFarmTokenAllowanceStatus === 'pending') {
      state.txIncreaseFarmTokenAllowanceStatus = 'idle'
    }
  })
})


export default farmReducer