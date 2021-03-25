import { call, put } from 'redux-saga/effects';
import { ethers } from "ethers";
import cnmAbi from "@abis/cnm.json";
import { APP_CNM_CONTRACT_ADDRESS } from "@emmpair/config";
import { fetchNetwork, fetchBalance } from "@emmpair/meths/wallet";
import { fetchCollateralBalance,
         fetchCollateralUsed,
         fetchBorrowLimit } from "@emmpair/meths/cnm";
// ..
import { walletHandshakeErrorAction,
         walletHandshakeRejectAction,
         walletAccountAction } from "@emmpair/reducers/wallet";
import { collateralAction } from "@emmpair/reducers/contract";


export function* handshakeWallet() {
  try {
    const method = { method: 'eth_requestAccounts' };
    const accounts = yield call(window.ethereum.request, method);
    const account = accounts[0];
    window.ethers = new ethers.providers.Web3Provider(window.ethereum);
    // ..
    const network = yield call(fetchNetwork, window.ethers);
    const balance = yield call(fetchBalance, window.ethers, account);
    // ..
    window.cnmContract = new ethers.Contract(APP_CNM_CONTRACT_ADDRESS,
                                             cnmAbi,
                                             window.ethers);
    const collateralBalance = yield call(fetchCollateralBalance,
                                         window.cnmContract,
                                         account);
    const collateralUsed = yield call(fetchCollateralUsed,
                                      window.cnmContract,
                                      account);
    const borrowLimit = yield call(fetchBorrowLimit,
                                   window.cnmContract,
                                   account);

    yield put(walletAccountAction({
      account, 
      network: { 
        name: network.name,
        ensAddress: network.ensAddress, 
        chainId: network.chainId, 
      }, 
      balance: balance.toString(),
    }));

    yield put(collateralAction({
      collateralBalance: collateralBalance.toString(),
      collateralUsed: collateralUsed.toString(),
      borrowLimit: borrowLimit.toString(),
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


