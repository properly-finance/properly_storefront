// function callStub(text){
//   return  new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// }

export function fetchCollateralBalance(contract, account){
  return contract.CollateralBalance(account);
};

export function fetchCollateralUsed(contract, account){
  return contract.CollateralUsed(account);
};

export function fetchBorrowLimit(contract, account){
  return contract.BorrowLimit(account);
};