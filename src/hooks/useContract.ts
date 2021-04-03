import { useCallback } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { TAppState, TCnmState } from "@emmpair/reducers/types";
import { TAppDispatch } from "@emmpair/types";
import { collateralPending, withdrawPending } from "@emmpair/actions/cnm";


export function pollCnm(): TCnmState {
  return useSelector((state: TAppState) => state.cnm)
};

export function useCollateralizeEth(
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(collateralPending(account, amount)), [dispatch])
};


export function useWithdrawCollateral(
): (account: string, amount: string) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((
    account: string, amount: string
  ) => dispatch(withdrawPending(account, amount)), [dispatch])
};