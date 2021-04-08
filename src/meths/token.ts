export function fetchTokenName(tokenContract){
  return tokenContract.name()
}

export function fetchTokenBalance(
  tokenContract,
  account: string
){
  return tokenContract.balanceOf(account)
};

export function fetchTokenAllowance(
  tokenContract,
  accountAddr: string,
  spenderContractAddr: string
){
  return tokenContract.allowance(accountAddr, spenderContractAddr)
};

export async function txMint(
  depositContract,
  amount: string
) {
  const tx = await depositContract.MintAsset(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txIncreaseTokenAllowance(
  tokenContract,
  spenderContractAddr: string,
  amount: string
) {
  const tx = await tokenContract.increaseAllowance(spenderContractAddr, amount)
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