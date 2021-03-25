import { call, put } from 'redux-saga/effects';
import { ethers } from "ethers";
import cnm_abi from "@abis/cnm.json";
import { APP_CNM_CONTRACT_ADDRESS } from "@emmpair/config";
import { fetchNetwork, fetchBalance } from "@emmpair/meths/wallet";
import { fetchCollateralBalance,
         fetchCollateralUsed,
         fetchBorrowLimit } from "@emmpair/meths/cnm";
// ..
import { walletHandshakeErrorAction,
         walletHandshakeRejectAction,
         walletAccountAction } from "@emmpair/reducers/wallet";
import { contractCollateralAction } from "@emmpair/reducers/contract";


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
    const cnm_contract = new ethers.Contract(APP_CNM_CONTRACT_ADDRESS,
                                             cnm_abi,
                                             window.web3);
    const collateralBalance = yield call(fetchCollateralBalance,
                                         cnm_contract,
                                         account);
    const collateralUsed = yield call(fetchCollateralUsed,
                                      cnm_contract,
                                      account);
    const borrowLimit = yield call(fetchBorrowLimit,
                                   cnm_contract,
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

    yield put(contractCollateralAction({
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


