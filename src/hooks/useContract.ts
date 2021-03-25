import { useCallback } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { IAppState } from "@emmpair/interfaces";
import { TAppDispatch } from "@emmpair/types";
import { collateralizeEthAction } from "@emmpair/reducers/contract";


export function pollContract(): IAppState['contract'] {
  return useSelector((state: IAppState) => state.contract)
};


export function useCollateralizeEth(): ({}) => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback((values) => dispatch(collateralizeEthAction(values)), [dispatch])
};
