import { call, put } from 'redux-saga/effects';
import { ethers } from "ethers";
import { collateralAction,
         collateralizeEthRejectAction,
         collateralizeEthErrorAction } from "@emmpair/reducers/contract";
import { doCollateralizeEth,
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



export function* collateralizeEth({ payload: { account, amount }}) {
  try {
    const signer = window.ethers?.getSigner()
    const cnmWithSigner = window.cnmContract.connect(signer)
    const bnAmount = ethers.utils.parseEther(amount || "0")

    yield call(doCollateralizeEth, cnmWithSigner, bnAmount)
    const collateralBalance = yield call(fetchCollateralBalance,
                                         window.cnmContract,
                                         account);
    const collateralUsed = yield call(fetchCollateralUsed,
                                      window.cnmContract,
                                      account);
    const borrowLimit = yield call(fetchBorrowLimit,
                                   window.cnmContract,
                                   account);

    yield put(collateralAction({
      collateralBalance: collateralBalance.toString(),
      collateralUsed: collateralUsed.toString(),
      borrowLimit: borrowLimit.toString(),
    }));
  } catch (error) {
    console.log(error.message);
    if (error.code == 4001){
      yield put(collateralizeEthRejectAction())      
    } else if (error.code == -32000 ){
      yield put(collateralizeEthRejectAction())
    } else {
      yield put(collateralizeEthErrorAction())
    }
  }
};


