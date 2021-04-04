import { action } from 'typesafe-actions'

export const UPDATE_TOKEN_INFO_REQUEST =  '[request] update/info/token'
export const updateTokenInfoRequest = ( balance: string ) => action(UPDATE_TOKEN_INFO_REQUEST, { balance })
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

export const BURN_PENDING = '[pending] burn/token'
export const BURN_REJECT = '[reject] burn/token'
export const BURN_ERROR = '[error] burn/token'
export const BURN_SUCCESS = '[success] burn/token'
export const burnPending = ( account: string, amount: string ) => action(BURN_PENDING, { account, amount })
export const burnReject = () => action(BURN_REJECT, {})
export const burnError = () => action(BURN_ERROR, {})
export const burnSuccess = ( balance: string ) => action(BURN_SUCCESS, { balance })
export type BurnPendingAction = ReturnType<typeof burnPending>
export type BurnRejectAction = ReturnType<typeof burnReject>
export type BurnErrorAction = ReturnType<typeof burnError>
export type BurnSuccessAction = ReturnType<typeof burnSuccess>