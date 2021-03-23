import { call, put } from 'redux-saga/effects';
import { ethers } from "ethers";
// import { IAction } from "@emmpair/interfaces"
import { 
  walletHandshakeErrorAction,
  walletHandshakeRejectAction,
  walletAccountAction } from "@emmpair/reducers/wallet";

// function callStub(text){
//   return  new Promise<string>(resolve => {
//     setTimeout(() => {
//       resolve(text)
//     }, 5000)
//   })
// }

function fetchNetwork(provider){
  return provider.getNetwork();
};

function fetchBalance(provider, account){
  return provider.getBalance(account);
};


export function* handshakeWallet() {
  try {
    const method = { method: 'eth_requestAccounts' };
    const accounts = yield call(window.ethereum.request, method);
    const account = accounts[0];
    window.web3 = new ethers.providers.Web3Provider(window.ethereum);
    // ..
    const network = yield call(fetchNetwork, window.web3);
    const balance = yield call(fetchBalance, window.web3, account);
    // ..
    yield put(walletAccountAction({
      account, 
      network: { 
        name: network.name,
        ensAddress: network.ensAddress, 
        chainId: network.chainId, 
      }, 
      balance: balance.toString(),
    }));
  } catch (error) {
    console.log(error.message);
    if (error.code == 4001){
      yield put(walletHandshakeRejectAction());
    } else {
      yield put(walletHandshakeErrorAction());
    };
  };
};


