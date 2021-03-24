import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import MetaMaskOnboarding from "@metamask/onboarding"
// ..
import { TAppDispatch } from "@emmpair/types"
import { IAppState } from "@emmpair/interfaces"
import { walletHandshakeAction } from "@emmpair/reducers/wallet"

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

export function pollWallet(): IAppState['wallet'] {
  return useSelector((state: IAppState) => state.wallet)
}

export function checkMetaMaskWallet(): [boolean, string] {
  const [is_ok, setOK] = useState(false)
  const [label_text, setLabelText] = useState('Connect')  

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOK(true)      
    } else {
      setOK(false)
      setLabelText('Install MetaMask')
    }
  }, [is_ok])

  return [is_ok, label_text]
}

export function useHandshakeWallet(): () => void {
  const dispatch = useDispatch<TAppDispatch>()
  return useCallback(() => (
    dispatch(walletHandshakeAction())
  ), [dispatch])
}

