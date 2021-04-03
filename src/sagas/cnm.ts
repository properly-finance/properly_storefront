import { call, put } from 'redux-saga/effects';
import { ethers } from "ethers";
import { fetchBalance } from "@emmpair/meths/wallet";
import { updateWalletRequest } from "@emmpair/actions/wallet";
import { collateralSuccess, withdrawSuccess,
         collateralReject, withdrawReject,
         collateralError, withdrawError } from "@emmpair/actions/cnm";
import { CollateralPendingAction,
         WithdrawPendingAction } from "@emmpair/actions/cnm";
import { txCollateralizeEth, txWithdrawCollateral,
         fetchCollateralBalance,
         fetchCollateralUsed,
         fetchBorrowLimit } from "@emmpair/meths/cnm";

// function callStub(text){
//   return new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// };


function* cnmWrap(
  account:string,
  amount:string,
  txMethod: typeof txCollateralizeEth | typeof txWithdrawCollateral,
  actionSuccess : typeof collateralSuccess | typeof withdrawSuccess,
  actionReject : typeof collateralReject | typeof withdrawReject,
  actionError : typeof collateralError | typeof withdrawError,  
) : Generator {
  try {
    const signer = window.ethers?.getSigner()
    const cnmWithSigner = window.cnmContract.connect(signer)
    const bnAmount = ethers.utils.parseEther(amount || "0")

    yield call(txMethod, cnmWithSigner, bnAmount)
    // ..
    const balance = yield call(fetchBalance, 
                               window.ethers,
                               account)    
    const collateralBalance = yield call(fetchCollateralBalance,
                                         window.cnmContract,
                                         account)
    const collateralUsed = yield call(fetchCollateralUsed,
                                      window.cnmContract,
                                      account)
    const borrowLimit = yield call(fetchBorrowLimit,
                                   window.cnmContract,
                                   account)
    yield put(updateWalletRequest(
      balance.toString(),
    ))
    yield put(actionSuccess(
      collateralBalance.toString(),
      collateralUsed.toString(),
      borrowLimit.toString(),
    ))
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(actionReject())      
    } else if (error.code == -32000 ){
      yield put(actionReject())
    } else {
      yield put(actionError())
    }
  }
}

export function* collateralizeEth(action: CollateralPendingAction) {
  const { account, amount } = action.payload 
  yield call(cnmWrap,
    account, amount, txCollateralizeEth, 
    collateralSuccess, collateralReject, collateralError
  )
}

export function* withdrawCollateral(action: WithdrawPendingAction) {
  const { account, amount } = action.payload 
  yield call(cnmWrap,
    account, amount, txWithdrawCollateral, 
    withdrawSuccess, withdrawReject, withdrawError
  )
};