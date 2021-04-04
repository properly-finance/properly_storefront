import { action } from 'typesafe-actions'

export const UPDATE_TOKEN_INFO_REQUEST =  '[request] update/info/token'
export const updateTokenInfoRequest = (
  balance: string, allowBurnBalance: string
) => action(UPDATE_TOKEN_INFO_REQUEST, {
  balance, allowBurnBalance
})
export type UpdateTokenInfoRequestAction = ReturnType<typeof updateTokenInfoRequest>

export const MINT_PENDING = '[pending] mint/token'
export const MINT_REJECT = '[reject] mint/token'
export const MINT_ERROR = '[error] mint/token'
export const MINT_SUCCESS = '[success] mint/token'
export const mintPending = ( account: string, amount: string ) => action(MINT_PENDING, { account, amount })
export const mintReject = () => action(MINT_REJECT, {})
export const mintError = () => action(MINT_ERROR, {})
export const mintSuccess = ( balance: string ) => action(MINT_SUCCESS, { balance })
export type MintPendingAction = ReturnType<typeof mintPending>
export type MintRejectAction = ReturnType<typeof mintReject>
export type MintErrorAction = ReturnType<typeof mintError>
export type MintSuccessAction = ReturnType<typeof mintSuccess>

export const APPROVE_BURN_PENDING = '[pending] approve burn/token'
export const APPROVE_BURN_REJECT = '[reject] approve burn/token'
export const APPROVE_BURN_ERROR = '[error] approve burn/token'
export const APPROVE_BURN_SUCCESS = '[success] approve burn/token'
export const approveBurnPending = ( account: string, amount: string ) => action(APPROVE_BURN_PENDING, { account, amount })
export const approveBurnReject = () => action(APPROVE_BURN_REJECT, {})
export const approveBurnError = () => action(APPROVE_BURN_ERROR, {})
export const approveBurnSuccess = ( balance: string ) => action(APPROVE_BURN_SUCCESS, { balance })
export type ApproveBurnPendingAction = ReturnType<typeof approveBurnPending>
export type ApproveBurnRejectAction = ReturnType<typeof approveBurnReject>
export type ApproveBurnErrorAction = ReturnType<typeof approveBurnError>
export type ApproveBurnSuccessAction = ReturnType<typeof approveBurnSuccess>

export const BURN_PENDING = '[pending] burn/token'
export const BURN_REJECT = '[reject] burn/token'
export const BURN_ERROR = '[error] burn/token'
export const BURN_SUCCESS = '[success] burn/token'
export const burnPending = ( account: string, amount: string ) => action(BURN_PENDING, { account, amount })
export const burnReject = () => action(BURN_REJECT, {})
export const burnError = () => action(BURN_ERROR, {})
export const burnSuccess = ( 
  balance: string, allowBurnBalance: string
) => action(BURN_SUCCESS, {
  balance, allowBurnBalance
})
export type BurnPendingAction = ReturnType<typeof burnPending>
export type BurnRejectAction = ReturnType<typeof burnReject>
export type BurnErrorAction = ReturnType<typeof burnError>
export type BurnSuccessAction = ReturnType<typeof burnSuccess>