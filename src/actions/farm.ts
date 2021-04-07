import { action } from 'typesafe-actions'
import { TFarms } from "@emmpair/reducers/types"

export const FETCH_FARMS_PENDING = '[pending] fetch/farms'
export const FETCH_FARMS_REJECT = '[reject] fetch/farms'
export const FETCH_FARMS_ERROR = '[error] fetch/farms'
export const FETCH_FARMS_SUCCESS = '[success] fetch/farms'
export const fetchFarmsPending = ( 
  offset: number, limit: number
) => action(FETCH_FARMS_PENDING, { 
  offset, limit
})
export const fetchFarmsReject = () => action(FETCH_FARMS_REJECT, {})
export const fetchFarmsError = () => action(FETCH_FARMS_ERROR, {})
export const fetchFarmsSuccess = ( 
  farms: TFarms, farmsCount: number
) => action(FETCH_FARMS_SUCCESS, { 
  farms, farmsCount 
})
export type FetchFarmsPending = ReturnType<typeof fetchFarmsPending>
export type FetchFarmsReject = ReturnType<typeof fetchFarmsReject>
export type FetchFarmsError = ReturnType<typeof fetchFarmsError>
export type FetchFarmsSuccess = ReturnType<typeof fetchFarmsSuccess>