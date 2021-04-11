
// export async function fetchTokenPairAddr(contract){
//   const addr0 = await contract.token0()
//   const addr1 = await contract.token1()
//   return [addr0, addr1]
// }

export function fetchTokenPairAddr(contract){
  return Promise.all([
    contract.token0(),
    contract.token1()
  ])
}

// export async function fetchTokenCompName(contract0, contract1){
//   const symbol0 = await contract0.symbol()
//   const symbol1 = await contract1.symbol()
//   return `${symbol0}/${symbol1}`
// }

export async function fetchTokenCompName(contract0, contract1){
  const [symbol0, symbol1] = await Promise.all([
    contract0.symbol(),
    contract1.symbol()
  ])
  return `${symbol0}/${symbol1}`
}

export function fetchTokenBalance(
  contract,
  account: string
){
  return contract.balanceOf(account)
};

export function fetchTokenAllowance(
  tokenContract,
  accountAddr: string,
  spenderContractAddr: string
){
  return tokenContract.allowance(accountAddr, spenderContractAddr)
};

export async function txIncreaseTokenAllowance(
  tokenContract,
  spenderContractAddr: string,
  amount: string
) {
  const tx = await tokenContract.increaseAllowance(spenderContractAddr, amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}
