import { action } from 'typesafe-actions'
import { TFarms } from "@emmpair/reducers/types"

// FETCH_FARMS
// ...
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

// INCREASE_FARM_TOKEN_ALLOWANCE
// ..
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

// DEPOSIT_FARM
// ..
export const DEPOSIT_FARM_PENDING = '[pending] deposit/farm'
export const DEPOSIT_FARM_REJECT = '[reject] deposit/farm'
export const DEPOSIT_FARM_ERROR = '[error] deposit/farm'
export const DEPOSIT_FARM_SUCCESS = '[success] deposit/farm'
export const depositFarmPending = ( 
  accountAddr: string, tokenAddr:string, amount: string, farmPid: number, farmKey: number
) => action(DEPOSIT_FARM_PENDING, { 
  accountAddr, tokenAddr, amount, farmPid, farmKey
})
export const depositFarmReject = () => action(DEPOSIT_FARM_REJECT, {})
export const depositFarmError = () => action(DEPOSIT_FARM_ERROR, {})
export const depositFarmSuccess = ( 
  allowance: string, amount: string, rewardDebt: string, farmKey: number
) => action(DEPOSIT_FARM_SUCCESS, { 
  allowance, amount, rewardDebt, farmKey
})
export type DepositFarmPendingAction = ReturnType<typeof depositFarmPending>
export type DepositFarmRejectAction = ReturnType<typeof depositFarmReject>
export type DepositFarmErrorAction = ReturnType<typeof depositFarmError>
export type DepositFarmSuccessAction = ReturnType<typeof depositFarmSuccess>

// WITHDRAW_FARM
// ..
export const WITHDRAW_FARM_PENDING = '[pending] withdraw/farm'
export const WITHDRAW_FARM_REJECT = '[reject] withdraw/farm'
export const WITHDRAW_FARM_ERROR = '[error] withdraw/farm'
export const WITHDRAW_FARM_SUCCESS = '[success] withdraw/farm'
export const withdrawFarmPending = ( 
  accountAddr: string, tokenAddr:string, amount: string, farmPid: number, farmKey: number
) => action(WITHDRAW_FARM_PENDING, { 
  accountAddr, tokenAddr, amount, farmPid, farmKey
})
export const withdrawFarmReject = () => action(WITHDRAW_FARM_REJECT, {})
export const withdrawFarmError = () => action(WITHDRAW_FARM_ERROR, {})
export const withdrawFarmSuccess = ( 
  allowance: string, amount: string, rewardDebt: string, farmKey: number
) => action(WITHDRAW_FARM_SUCCESS, { 
  allowance, amount, rewardDebt, farmKey
})
export type WithdrawFarmPendingAction = ReturnType<typeof withdrawFarmPending>
export type WithdrawFarmRejectAction = ReturnType<typeof withdrawFarmReject>
export type WithdrawFarmErrorAction = ReturnType<typeof withdrawFarmError>
export type WithdrawFarmSuccessAction = ReturnType<typeof withdrawFarmSuccess>