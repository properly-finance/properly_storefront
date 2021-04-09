import { TAppDispatch } from "@emmpair/types"
import { TAppState, TWalletState } from "@emmpair/reducers/types"
import { useCallback } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { 
  handshakeWalletPending,
  fetchPriceTokenWalletPending } from "@emmpair/actions/wallet"

export function pollWallet(): TWalletState {
  return useSelector((state: TAppState) => state.wallet)
}

export function useHandshakeWallet(): () => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback(() => (
    dispatch(handshakeWalletPending())
  ), [dispatch])
}

export function useFetchPriceTokenWallet(): () => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback(() => (
    dispatch(fetchPriceTokenWalletPending())
  ), [dispatch])
}
