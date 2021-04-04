import { call, put } from 'redux-saga/effects';
import { ethers } from "ethers";
import depositABI from "@abis/deposit.json";
import tokenABI from "@abis/token.json";
import { APP_DEPOSIT_CONTRACT_ADDRESS,
         APP_TOKEN_CONTRACT_ADDRESS } from "@emmpair/config";
import { fetchNetwork, fetchBalance } from "@emmpair/meths/wallet";
import { fetchCollateralBalance,
         fetchCollateralUsed,
         fetchBorrowLimit } from "@emmpair/meths/deposit";
import { collateralSuccess } from "@emmpair/actions/deposit";
import { handshakeWalletError,
         handshakeWalletReject,
         handshakeWalletSuccess } from "@emmpair/actions/wallet";
import { fetchTokenBalance,
         fetchTokenBurnBalance } from "@emmpair/meths/token";
import { updateTokenInfoRequest } from "@emmpair/actions/token";
                  

export function* handshakeWallet() {
  try {
    const method = { method: 'eth_requestAccounts' }
    const accounts = yield call(window.ethereum.request, method)
    const accountAddr = accounts[0]
    // ..
    window.ethers = new ethers.providers.Web3Provider(window.ethereum)
    window.depositContract = new ethers.Contract(APP_DEPOSIT_CONTRACT_ADDRESS,
                                             depositABI,
                                             window.ethers)
    window.tokenContract = new ethers.Contract(APP_TOKEN_CONTRACT_ADDRESS,
                                             tokenABI,
                                             window.ethers)
    // ..
    const network = yield call(fetchNetwork, window.ethers)
    const balance = yield call(fetchBalance, window.ethers, accountAddr)
    // ..
    const collateralBalance = yield call(fetchCollateralBalance,
                                         window.depositContract,
                                         accountAddr)
    const collateralUsed = yield call(fetchCollateralUsed,
                                      window.depositContract,
                                      accountAddr)
    const borrowLimit = yield call(fetchBorrowLimit,
                                   window.depositContract,
                                   accountAddr)
    const tokenBalance = yield call(fetchTokenBalance,
                                   window.tokenContract,
                                   accountAddr)
    const tokenAllowBurnBalance = yield call(fetchTokenBurnBalance,
                                   window.tokenContract,
                                   accountAddr,
                                   APP_DEPOSIT_CONTRACT_ADDRESS)
    yield put(handshakeWalletSuccess(
      accountAddr, 
      {
        name: network.name,
        ensAddress: network.ensAddress,
        chainId: network.chainId
      }, 
      balance.toString(),
    ))
    yield put(collateralSuccess(
      collateralBalance.toString(),
      collateralUsed.toString(),
      borrowLimit.toString(),
    ))
    yield put(updateTokenInfoRequest(
      tokenBalance.toString(),
      tokenAllowBurnBalance.toString(),
    ))    
  } catch (error) {
    console.log(error.message)
    if (error.code == 4001){
      yield put(handshakeWalletReject())
    } else {
      yield put(handshakeWalletError())
    };
  };
};


