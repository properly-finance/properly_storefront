// function callStub(text){
//   return  new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// }

export function fetchNetwork(provider){
  return provider.getNetwork()
}

export function fetchBalance(provider, account){
  return provider.getBalance(account)
}

export function fetchPriceTokenWallet(depositContract){
    return depositContract.LandIndexPrice()
}