import { action } from 'typesafe-actions'
import { TFarms } from "@emmpair/reducers/types"

export const FETCH_FARMS_PENDING = '[pending] fetch/farms'
export const FETCH_FARMS_REJECT = '[reject] fetch/farms'
export const FETCH_FARMS_ERROR = '[error] fetch/farms'
export const FETCH_FARMS_SUCCESS = '[success] fetch/farms'
export const fetchFarmsPending = ( 
  account: string | undefined, offset: number, limit: number
) => action(FETCH_FARMS_PENDING, { 
  account, offset, limit
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


export const INCREASE_FARM_TOKEN_ALLOWANCE_PENDING = '[pending] increase allowance/token/farm'
export const INCREASE_FARM_TOKEN_ALLOWANCE_REJECT = '[reject] increase allowance/token/farm'
export const INCREASE_FARM_TOKEN_ALLOWANCE_ERROR = '[error] increase allowance/token/farm'
export const INCREASE_FARM_TOKEN_ALLOWANCE_SUCCESS = '[success] increase allowance/token/farm'
export const increaseFarmTokenAllowancePending = (
  accountAddr: string, tokenAddr:string,  amount: string, farmKey: number
) => action(INCREASE_FARM_TOKEN_ALLOWANCE_PENDING, {
  accountAddr, tokenAddr,  amount, farmKey
})
export const increaseFarmTokenAllowanceReject = (
) => action(INCREASE_FARM_TOKEN_ALLOWANCE_REJECT, {})
export const increaseFarmTokenAllowanceError = (
) => action(INCREASE_FARM_TOKEN_ALLOWANCE_ERROR, {})
export const increaseFarmTokenAllowanceSuccess = (
  allowance: string, farmKey: number
) => action(INCREASE_FARM_TOKEN_ALLOWANCE_SUCCESS, { 
  allowance, farmKey
})
export type IncreaseFarmTokenAllowancePendingAction = ReturnType<typeof increaseFarmTokenAllowancePending>
export type IncreaseFarmTokenAllowanceRejectAction = ReturnType<typeof increaseFarmTokenAllowanceReject>
export type IncreaseFarmTokenAllowanceErrorAction = ReturnType<typeof increaseFarmTokenAllowanceError>
export type IncreaseFarmTokenAllowanceSuccessAction = ReturnType<typeof increaseFarmTokenAllowanceSuccess>