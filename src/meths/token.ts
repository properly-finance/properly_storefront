export function fetchTokenBalance(
  tokenContract,
  account: string
){
  return tokenContract.balanceOf(account)
};

export function fetchTokenBurnBalance(
  tokenContract,
  accountAddr: string,
  depositContractAddr: string
){
  return tokenContract.allowance(accountAddr, depositContractAddr)
};

export async function txMint(
  depositContract,
  amount: string
) {
  const tx = await depositContract.MintAsset(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txApproveBurn(
  tokenContract,
  depositContractAddr: string,
  amount: string
) {
  const tx = await tokenContract.increaseAllowance(depositContractAddr, amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txBurn(
  depositContract,
  amount: string
) {
  const tx = await depositContract.BurnAsset(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}