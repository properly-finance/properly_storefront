import { useCallback } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { TAppState, TDepositState, TTokenState } from "@emmpair/reducers/types";
import { TAppDispatch } from "@emmpair/types";
import { collateralPending, withdrawPending } from "@emmpair/actions/deposit";
import { mintPending, burnPending } from "@emmpair/actions/token";

// pools
// 
export function pollDeposit(): TDepositState {
  return useSelector((state: TAppState) => state.deposit)
}

export function pollToken(): TTokenState {
  return useSelector((state: TAppState) => state.token)
}

// deposit
// 
export function useCollaterateDeposit(
  // pass
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(collateralPending(account, amount)), [dispatch])
}

export function useWithdrawDeposit(
  // pass
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(withdrawPending(account, amount)), [dispatch])
}

// token
// 
export function useMintAsset(
  // pass
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(mintPending(account, amount)), [dispatch])
}

export function useBurnAsset(
  // pass
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(burnPending(account, amount)), [dispatch])
}