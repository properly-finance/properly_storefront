import { call, put, all } from 'redux-saga/effects'
import { ethers } from "ethers"
import { APP_FARM_CONTRACT_ADDRESS } from "@emmpair/config"
import farmABI from "@abis/farm.json"
import tokenABI from "@abis/token.json"
import { 
  fetchFarmsCount,
  fetchFarmInfo,
  fetchFarmUserInfo,
  txDepositFarm,
  txWithdrawFarm } from "@emmpair/meths/farm"
import { 
  fetchTokenName,
  fetchTokenAllowance,
  txIncreaseTokenAllowance } from "@emmpair/meths/token"
import { 
  FetchFarmsPending,
  fetchFarmsReject,
  fetchFarmsError,
  fetchFarmsSuccess } from "@emmpair/actions/farm"
import {
  IncreaseFarmTokenAllowancePendingAction,
  increaseFarmTokenAllowanceReject,
  increaseFarmTokenAllowanceError,
  increaseFarmTokenAllowanceSuccess } from "@emmpair/actions/farm"
import {
  DepositFarmPendingAction,
  depositFarmReject,
  depositFarmError,
  depositFarmSuccess } from "@emmpair/actions/farm"
import {
  WithdrawFarmPendingAction,
  withdrawFarmReject,
  withdrawFarmError,
  withdrawFarmSuccess } from "@emmpair/actions/farm"  

export function* fetchFarms(action: FetchFarmsPending) {
  const { account, offset, limit } = action.payload 
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const farmContract = new ethers.Contract(APP_FARM_CONTRACT_ADDRESS,
                                            farmABI,
                                            provider)
  try { 
    const bigFarmsCount = yield call(fetchFarmsCount, farmContract)
    const farmsCount = Number(`${bigFarmsCount}`)
    const fix1Offset = offset > farmsCount 
                       ? farmsCount - limit
                       : offset
    const fix2Offset = fix1Offset < 0
                       ? 0
                       : fix1Offset
    const fixLimit = fix2Offset + limit > farmsCount
                     ? farmsCount
                     : fix2Offset + limit
    const qbatch = []
    for (var i = fix2Offset; i < fixLimit; i++) {
      qbatch.push(call(fetchFarmInfo, farmContract, i))
    }
    const farms = qbatch.length > 0
                ? yield all(qbatch)  
                : []
    const tookens_contracts = farms.map((farm) => (
      new ethers.Contract(farm.lpToken, tokenABI, provider)
    ))

    // TokenName
    // ...
    const qbatch_names = tookens_contracts.map((contract) => (
      call(fetchTokenName, contract)
    ))
    const farms_token_names = qbatch_names.length > 0
      ? yield all(qbatch_names)
      : []

    // TokenAllowance
    // ..
    const farms_allowance_batch = account 
      ? tookens_contracts.map((contract) => (
          call(fetchTokenAllowance, 
               contract, account, APP_FARM_CONTRACT_ADDRESS)))
      : []
    const farms_allowance = farms_allowance_batch.length > 0
      ? yield all(farms_allowance_batch)
      : []

    // userInfos
    const farms_userInfos_batch = account 
      ? farms.map((_farm, key) => (
          call(fetchFarmUserInfo, 
               farmContract, fix2Offset + key, account)))
      : []
    const farms_userInfos = farms_userInfos_batch.length > 0
      ? yield all(farms_userInfos_batch)
      : []

    const farmsMap = farms.map((farm, key) => ({
      pid: fix2Offset + key,
      name: farms_token_names[key],
      // user
      allowance: farms_allowance.length > 0 ? farms_allowance[key].toString() : 0,
      amount: farms_userInfos.length > 0 ? farms_userInfos[key].amount.toString() : 0,
      rewardDebt: farms_userInfos.length > 0 ? farms_userInfos[key].rewardDebt.toString() : 0,
      // ..
      lpToken: farm.lpToken,
      depositFeeBP: farm.depositFeeBP,
      accPROPPerShare: farm.accPROPPerShare.toString(),
      allocPoint: farm.allocPoint.toString(),
      lastRewardBlock: farm.lastRewardBlock.toString(),
    }))

    yield put(fetchFarmsSuccess(farmsMap, farmsCount))
    console.log('loded...')    
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(fetchFarmsReject())
    } else {
      yield put(fetchFarmsError())
    }
  }
}

export function* increaseAllowanceTokenFarm(
  action: IncreaseFarmTokenAllowancePendingAction
) {
  const { accountAddr, tokenAddr, amount, farmKey } = action.payload 
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const tokenContract = new ethers.Contract(tokenAddr, tokenABI, provider)
    const signer = window.ethers?.getSigner()
    const tokenContractWithSigner = tokenContract.connect(signer)    
        
    yield call(txIncreaseTokenAllowance,
               tokenContractWithSigner,
               APP_FARM_CONTRACT_ADDRESS,
               amount)
    const allowance = yield call(fetchTokenAllowance,
                                 tokenContract,
                                 accountAddr,
                                 APP_FARM_CONTRACT_ADDRESS)
    yield put(increaseFarmTokenAllowanceSuccess(
      allowance.toString(),
      farmKey
    ))
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(increaseFarmTokenAllowanceReject())      
    } else if (error.code == -32000 ){
      yield put(increaseFarmTokenAllowanceReject())
    } else {
      yield put(increaseFarmTokenAllowanceError())
    }
  }
}

export function* depositFarm(
  action: DepositFarmPendingAction
) {
  const { accountAddr, tokenAddr, amount, farmPid, farmKey } = action.payload 
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const farmContract = new ethers.Contract(APP_FARM_CONTRACT_ADDRESS,
                                             farmABI, provider)
    const tokenContract = new ethers.Contract(tokenAddr,
                                              tokenABI, provider)
    const signer = window.ethers?.getSigner()
    const farmContractWithSigner = farmContract.connect(signer)    
        
    yield call(txDepositFarm, farmContractWithSigner, farmPid, amount)
    const allowance = yield call(fetchTokenAllowance,
                                 tokenContract,
                                 accountAddr,
                                 APP_FARM_CONTRACT_ADDRESS)
    const userInfo =  yield call(fetchFarmUserInfo, 
                                 farmContract,
                                 farmPid,
                                 accountAddr)
    yield put(depositFarmSuccess(
      allowance.toString(),
      userInfo.amount.toString(),
      userInfo.rewardDebt.toString(),      
      farmKey
    ))
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(depositFarmReject())      
    } else if (error.code == -32000 ){
      yield put(depositFarmReject())
    } else {
      yield put(depositFarmError())
    }
  }
}

export function* withdrawFarm(
  action: WithdrawFarmPendingAction
) {
  const { accountAddr, tokenAddr, amount, farmPid, farmKey } = action.payload 
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const farmContract = new ethers.Contract(APP_FARM_CONTRACT_ADDRESS,
                                             farmABI, provider)
    const tokenContract = new ethers.Contract(tokenAddr,
                                              tokenABI, provider)
    const signer = window.ethers?.getSigner()
    const farmContractWithSigner = farmContract.connect(signer)    
        
    yield call(txWithdrawFarm, farmContractWithSigner, farmPid, amount)
    const allowance = yield call(fetchTokenAllowance,
                                 tokenContract,
                                 accountAddr,
                                 APP_FARM_CONTRACT_ADDRESS)
    const userInfo =  yield call(fetchFarmUserInfo, 
                                 farmContract,
                                 farmPid,
                                 accountAddr)
    yield put(withdrawFarmSuccess(
      allowance.toString(),
      userInfo.amount.toString(),
      userInfo.rewardDebt.toString(),      
      farmKey
    ))
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(withdrawFarmReject())      
    } else if (error.code == -32000 ){
      yield put(withdrawFarmReject())
    } else {
      yield put(withdrawFarmError())
    }
  }
}