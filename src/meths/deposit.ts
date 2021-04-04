// function callStub(text){
//   return  new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// }

export function fetchCollateralBalance(contract, account){
  return contract.CollateralBalance(account)
};

export function fetchCollateralUsed(contract, account){
  return contract.CollateralUsedEth(account)
};

export function fetchBorrowLimit(contract, account){
  return contract.CurrentBorrowLimitEth(account)
};

export async function txCollateralizeEth(contract, amount) {
  const tx = await contract.CollateralizeEth({value: amount})
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txWithdrawCollateral(contract, amount) {
  const tx = await contract.WithdrawCollateral(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}