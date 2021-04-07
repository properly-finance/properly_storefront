import { call, put, all } from 'redux-saga/effects'
import { ethers } from "ethers"
import { APP_FARM_CONTRACT_ADDRESS } from "@emmpair/config"
import farmABI from "@abis/farm.json"
import tokenABI from "@abis/token.json"
import { FetchFarmsPending } from "@emmpair/actions/farm"
import { fetchFarmsCount, fetchFarmInfo } from "@emmpair/meths/farm"
import { fetchTokenName } from "@emmpair/meths/token"
import { fetchFarmsReject,
         fetchFarmsError,
         fetchFarmsSuccess } from "@emmpair/actions/farm"

export function* fetchFarms(action: FetchFarmsPending) {
  const { offset, limit } = action.payload 
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
    const qbatch_names = farms.map((farm) => (call(
      fetchTokenName, 
      new ethers.Contract(farm.lpToken, tokenABI, provider)
    )))
    const farms_token_names = qbatch_names.length > 0
                              ? yield all(qbatch_names)
                              : []
    const sfarms = farms.map((farm, key) => ({
      name: farms_token_names[key],
      lpToken: farm.lpToken,
      depositFeeBP: farm.depositFeeBP,
      accPROPPerShare: farm.accPROPPerShare.toString(),
      allocPoint: farm.allocPoint.toString(),
      lastRewardBlock: farm.lastRewardBlock.toString(),
    }))

    yield put(fetchFarmsSuccess(sfarms, farmsCount))
    console.log('loded...')    
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(fetchFarmsReject())
    } else {
      yield put(fetchFarmsError())
    };
  };

}