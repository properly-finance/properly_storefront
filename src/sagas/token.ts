import { call, put } from 'redux-saga/effects'
import { ethers } from "ethers"
import { APP_DEPOSIT_CONTRACT_ADDRESS } from "@emmpair/config"
import { updateDepositInfoRequest } from "@emmpair/actions/deposit"
import { MintPendingAction, BurnPendingAction, ApproveBurnPendingAction,
         mintSuccess, burnSuccess, approveBurnSuccess,
         mintReject, burnReject, approveBurnReject,
         mintError, burnError, approveBurnError } from "@emmpair/actions/token"
import { fetchCollateralBalance,
         fetchCollateralUsed,
         fetchBorrowLimit,
         txMint,
         txBurn } from "@emmpair/meths/deposit"
import { fetchTokenBalance,
         fetchTokenAllowance,
         txIncreaseTokenAllowance } from "@emmpair/meths/token"

// function callStub(text){
//   return new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// };

export function* mintToken(action: MintPendingAction) {
  const { account, amount } = action.payload 
  try {
    const signer = window.ethers?.getSigner()
    const depositContractWithSigner = window.depositContract.connect(signer)    
    const bigAmount = ethers.utils.parseEther(amount || "0")
        
    yield call(txMint, depositContractWithSigner, bigAmount)

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
    yield put(mintSuccess(
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
      yield put(mintReject())      
    } else if (error.code == -32000 ){
      yield put(mintReject())
    } else {
      yield put(mintError())
    }
  }  
}

export function* burnToken(action: BurnPendingAction) {
  const { account, amount } = action.payload 
  try {
    const signer = window.ethers?.getSigner()
    const depositContractWithSigner = window.depositContract.connect(signer)    
    const bigAmount = ethers.utils.parseEther(amount || "0")
            
    yield call(txBurn, depositContractWithSigner, bigAmount)

    const balance = yield call(fetchTokenBalance, 
                               window.tokenContract,
                               account)
    const allowBurnBalance = yield call(fetchTokenAllowance,
                                   window.tokenContract,
                                   account,
                                   APP_DEPOSIT_CONTRACT_ADDRESS)
    const collateralBalance = yield call(fetchCollateralBalance,
                                         window.depositContract,
                                         account)
    const collateralUsed = yield call(fetchCollateralUsed,
                                      window.depositContract,
                                      account)
    const borrowLimit = yield call(fetchBorrowLimit,
                                   window.depositContract,
                                   account)
    yield put(burnSuccess(
      balance.toString(),
      allowBurnBalance.toString(),
    ))
    yield put(updateDepositInfoRequest(
      collateralBalance.toString(),
      collateralUsed.toString(),
      borrowLimit.toString(),
    ))
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(burnReject())      
    } else if (error.code == -32000 ){
      yield put(burnReject())
    } else {
      yield put(burnError())
    }
  }  
}

export function* approveBurnToken(action: ApproveBurnPendingAction) {
  const { account, amount } = action.payload 
  try {
    const signer = window.ethers?.getSigner()
    const tokenContractWithSigner = window.tokenContract.connect(signer)    
        
    yield call(txIncreaseTokenAllowance,
               tokenContractWithSigner,
               APP_DEPOSIT_CONTRACT_ADDRESS,
               amount)
    const balance = yield call(fetchTokenAllowance,
                               window.tokenContract,
                               account,
                               APP_DEPOSIT_CONTRACT_ADDRESS)
    yield put(approveBurnSuccess(
      balance.toString(),
    ))
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(approveBurnReject())      
    } else if (error.code == -32000 ){
      yield put(approveBurnReject())
    } else {
      yield put(approveBurnError())
    }
  }
}