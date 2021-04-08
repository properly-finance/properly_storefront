import { useCallback } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { TAppState, TDepositState, TTokenState, TFarmState } from "@emmpair/reducers/types";
import { TAppDispatch } from "@emmpair/types";
import { collateralPending, withdrawPending } from "@emmpair/actions/deposit";
import { mintPending, approveBurnPending, burnPending } from "@emmpair/actions/token";
import { fetchFarmsPending, 
         increaseFarmTokenAllowancePending,
         depositFarmPending,
         withdrawFarmPending } from "@emmpair/actions/farm"

// deposit
// =======
export function pollDeposit(): TDepositState {
  return useSelector((state: TAppState) => state.deposit)
}

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
// =====
export function pollToken(): TTokenState {
  return useSelector((state: TAppState) => state.token)
}

export function useMintAsset(
  // pass
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(mintPending(account, amount)), [dispatch])
}

export function useApproveBurnAsset(
  // pass
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(approveBurnPending(account, amount)), [dispatch])
}

export function useBurnAsset(
  // pass
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(burnPending(account, amount)), [dispatch])
}

// farm
// ====
export function pollFarm(): TFarmState {
  return useSelector((state: TAppState) => state.farm)
}

export function useFetchFarms(
  // pass
): (account: string | undefined, offset: number, limit: number) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string | undefined, offset: number, limit: number
  ) => dispatch(fetchFarmsPending(account, offset, limit)), [dispatch])
}

export function useIncreaseFarmTokenAllowance(
  // pass
): (
  accountAddr: string, tokenAddr:string,  amount: string, farmKey: number
) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    accountAddr: string, tokenAddr:string,  amount: string, farmKey: number
  ) => dispatch(increaseFarmTokenAllowancePending(
    accountAddr, tokenAddr, amount, farmKey
  )), [dispatch])
}

export function useDepositFarm(
  // pass
): (
  accountAddr: string, tokenAddr:string, amount: string, farmPid: number, farmKey: number
) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    accountAddr: string, tokenAddr:string, amount: string, farmPid: number, farmKey: number
  ) => dispatch(depositFarmPending(
    accountAddr, tokenAddr, amount, farmPid, farmKey
  )), [dispatch])
}

export function useWithdrawFarm(
  // pass
): (
  accountAddr: string, tokenAddr:string, amount: string, farmPid: number, farmKey: number
) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    accountAddr: string, tokenAddr:string, amount: string, farmPid: number, farmKey: number
  ) => dispatch(withdrawFarmPending(
    accountAddr, tokenAddr, amount, farmPid, farmKey
  )), [dispatch])
}