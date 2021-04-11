export function fetchFarmsCount(contract){
  return contract.poolLength()
}

export function fetchFarmInfo(contract, n: number){
  return contract.poolInfo(n)
}

export function fetchFarmUserInfo(
  contract,
  pid: number,
  accountAddr:string
) {
  return contract.userInfo(pid, accountAddr)
}

export function fetchFarmPendingDPI(
  contract,
  pid: number,
  accountAddr:string
) {
  return contract.pendingDPI(pid, accountAddr)
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