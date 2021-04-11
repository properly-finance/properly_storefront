import { BigNumber } from "ethers"
// function callStub(text){
//   return  new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// }

export function fetchCollateralBalance(contract, account){
  return contract.collateralBalance(account)
};

export function fetchCollateralUsed(contract, account){
  return contract.collateralUsedEth(account)
};

export function fetchBorrowLimit(contract, account){
  return contract.currentBorrowLimitEth(account)
};

export async function txCollateralizeEth(
  contract,
  amount: BigNumber
) {
  const tx = await contract.collateralizeEth({value: amount})
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txWithdrawCollateral(
  contract,
  amount: BigNumber
) {
  const tx = await contract.withdrawCollateral(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txMint(
  contract,
  amount: BigNumber
) {
  const tx = await contract.mintAsset(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}

export async function txBurn(
  contract,
  amount: BigNumber
) {
  const tx = await contract.burnAsset(amount)
  const txInfo = await tx.wait()
  return [tx, txInfo]
}