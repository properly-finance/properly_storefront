import { action } from 'typesafe-actions';

export const COLLATERAL_PENDING = '[pending] collateral/cnm';
export const COLLATERAL_REJECT = '[reject] collateral/cnm';
export const COLLATERAL_ERROR = '[error] collateral/cnm';
export const COLLATERAL_SUCCESS = '[success] collateral/cnm';

export const collateralPending = (
    account: string, amount: string
) => action(COLLATERAL_PENDING, {account, amount});

export const collateralReject = (
) => action(COLLATERAL_REJECT, {});

export const collateralError = (
) => action(COLLATERAL_ERROR, {});

export const collateralSuccess = (
  collateralBalance: string, collateralUsed: string, borrowLimit: string,
) => action(COLLATERAL_SUCCESS, {collateralBalance, collateralUsed, borrowLimit});

export type CollateralPendingAction = ReturnType<typeof collateralPending>;
export type CollateralRejectAction = ReturnType<typeof collateralReject>;
export type CollateralErrorAction = ReturnType<typeof collateralError>;
export type CollateralSuccessAction = ReturnType<typeof collateralSuccess>;

// ===========================================

export const WITHDRAW_PENDING = '[pending] withdraw/cnm';
export const WITHDRAW_REJECT = '[reject] withdraw/cnm';
export const WITHDRAW_ERROR = '[error] withdraw/cnm';
export const WITHDRAW_SUCCESS = '[success] withdraw/cnm';

export const withdrawPending = (
    account: string, amount: string    
) => action(WITHDRAW_PENDING, {account, amount});

export const withdrawReject = (
) => action(WITHDRAW_REJECT, {});

export const withdrawError = (
) => action(WITHDRAW_ERROR, {});

export const withdrawSuccess = (
  collateralBalance: string, collateralUsed: string, borrowLimit: string,
) => action(WITHDRAW_SUCCESS, {collateralBalance, collateralUsed, borrowLimit});

export type WithdrawPendingAction = ReturnType<typeof withdrawPending>;
export type WithdrawRejectAction = ReturnType<typeof withdrawReject>;
export type WithdrawErrorAction = ReturnType<typeof withdrawError>;
export type WithdrawSuccessAction = ReturnType<typeof withdrawSuccess>;