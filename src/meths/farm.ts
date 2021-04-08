export function fetchFarmsCount(contract){
  return contract.poolLength()
}

export function fetchFarmInfo(contract, n: number){
  return contract.poolInfo(n)
}

export function fetchFarmUserInfo(contract, n: number, accountAddr:string) {
  return contract.userInfo(n, accountAddr)
}

export async function txDepositFarm(
  farmContract, pid: number, amount: string,
) {
  const tx = await farmContract.deposit(pid, amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txWithdrawFarm(
  farmContract, pid: number, amount: string,
) {
  const tx = await farmContract.withdraw(pid, amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}