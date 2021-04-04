export type TWalletState = {
  hsStatus: string
  account?: string
  network?: any
  balance?: string
}

export type TDepositState = {
  txCollateralStatus: string
  txWithdrawStatus: string  
  collateralBalance?: string
  collateralUsed?: string
  borrowLimit?: string
}

export type TTokenState = {
  txMintStatus: string
  txBurnStatus: string    
  balance?: string
}

export type TAppState = {
    wallet: TWalletState
    deposit: TDepositState
    token: TTokenState
}