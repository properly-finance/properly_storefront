import { action } from 'typesafe-actions'
import { TNetworkWallet } from "./types"


export const HANDSHAKE_WALLET_PENDING = '[pending] handshake/wallet'
export const HANDSHAKE_WALLET_REJECT = '[reject] handshake/wallet'
export const HANDSHAKE_WALLET_ERROR = '[error] handshake/wallet'
export const HANDSHAKE_WALLET_SUCCESS = '[success] handshake/wallet'
export const handshakeWalletPending = () => action(HANDSHAKE_WALLET_PENDING, {})
export const handshakeWalletReject = () => action(HANDSHAKE_WALLET_REJECT, {})
export const handshakeWalletError = () => action(HANDSHAKE_WALLET_ERROR, {})
export const handshakeWalletSuccess = (
  account: string, network: TNetworkWallet, balance: string,
) => action(HANDSHAKE_WALLET_SUCCESS, {
  account, network, balance
})
export type HandshakeWalletPendingAction = ReturnType<typeof handshakeWalletPending>
export type HandshakeWalletRejectAction = ReturnType<typeof handshakeWalletReject>
export type HandshakeWalletErrorAction = ReturnType<typeof handshakeWalletError>
export type HandshakeWalletSuccessAction = ReturnType<typeof handshakeWalletSuccess>

// ===========================================

export const UPDATE_WALLET_REQUEST =  '[request] update/wallet'
export const updateWalletRequest = (
  balance: string,
) => action(UPDATE_WALLET_REQUEST, {
  balance
})
export type UpdateWalletRequestAction = ReturnType<typeof updateWalletRequest>

// ===========================================

export const FETCH_PRICE_TOKEN_WALLET_PENDING = '[pending] fetch price token/wallet'
export const FETCH_PRICE_TOKEN_WALLET_REJECT = '[reject] fetch price token/wallet'
export const FETCH_PRICE_TOKEN_WALLET_ERROR = '[error] fetch price token/wallet'
export const FETCH_PRICE_TOKEN_WALLET_SUCCESS = '[success] fetch price token/wallet'
export const fetchPriceTokenWalletPending = () => action(FETCH_PRICE_TOKEN_WALLET_PENDING, {})
export const fetchPriceTokenWalletReject = () => action(FETCH_PRICE_TOKEN_WALLET_REJECT, {})
export const fetchPriceTokenWalletError = () => action(FETCH_PRICE_TOKEN_WALLET_ERROR, {})
export const fetchPriceTokenWalletSuccess = (price: string) => action(FETCH_PRICE_TOKEN_WALLET_SUCCESS, { price })
export type fetchPriceTokenWalletPendingAction = ReturnType<typeof fetchPriceTokenWalletPending>
export type fetchPriceTokenWalletRejectAction = ReturnType<typeof fetchPriceTokenWalletReject>
export type fetchPriceTokenWalletErrorAction = ReturnType<typeof fetchPriceTokenWalletError>
export type fetchPriceTokenWalletSuccessAction = ReturnType<typeof fetchPriceTokenWalletSuccess>