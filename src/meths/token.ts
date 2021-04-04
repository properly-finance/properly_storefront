export function fetchTokenBalance(contract, account){
  return contract.balanceOf(account)
};

export async function txMint(contract, amount) {
  const tx = await contract.MintAsset(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txBurn(contract, amount) {
  const tx = await contract.BurnAsset(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}