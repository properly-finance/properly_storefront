import { call, put } from 'redux-saga/effects'
// import { ethers } from "ethers";
import { updateDepositInfoRequest } from "@emmpair/actions/deposit"
import { MintPendingAction, BurnPendingAction,
         mintSuccess, burnSuccess,
         mintReject, burnReject,
         mintError, burnError } from "@emmpair/actions/token"
import { fetchCollateralBalance,
         fetchCollateralUsed,
         fetchBorrowLimit } from "@emmpair/meths/deposit"
import { fetchTokenBalance, 
         txMint, txBurn } from "@emmpair/meths/token"

// function callStub(text){
//   return new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// };


function* txWrap(
  account:string,
  amount:string,
  txMethod: typeof txMint | typeof txBurn,
  actionSuccess : typeof mintSuccess | typeof burnSuccess,
  actionReject : typeof mintReject | typeof burnReject,
  actionError : typeof mintError | typeof burnError,  
) : Generator {
  try {
    const signer = window.ethers?.getSigner()
    const depositContractWithSigner = window.depositContract.connect(signer)    
    // const bnAmount = ethers.utils.parseEther(amount || "0")
        
    yield call(txMethod, depositContractWithSigner, amount)

    const balance = yield call(fetchTokenBalance, 
                               window.tokenContract,
                               account)    
    const collateralBalance = yield call(fetchCollateralBalance,
                                         window.depositContract,
                                         account)
    const collateralUsed = yield call(fetchCollateralUsed,
                                      window.depositContract,
                                      account)
    const borrowLimit = yield call(fetchBorrowLimit,
                                   window.depositContract,
                                   account)
    yield put(actionSuccess(
      balance.toString(),
    ))
    yield put(updateDepositInfoRequest(
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

export function* mintToken(action: MintPendingAction) {
  const { account, amount } = action.payload 
  yield call(txWrap,
    account, amount, txMint, 
    mintSuccess, mintReject, mintError
  )
}


export function* burnToken(action: BurnPendingAction) {
  const { account, amount } = action.payload 
  yield call(txWrap,
    account, amount, txBurn, 
    burnSuccess, burnReject, burnError
  )
}
