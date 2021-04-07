export function fetchFarmsCount(contract){
  return contract.poolLength()
}

export function fetchFarmInfo(contract, n: number){
  return contract.poolInfo(n)
}