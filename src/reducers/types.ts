export type TWalletState = {
  hsStatus: string
  account?: string
  network?: any
  balance?: string
}

export type TCnmState = {
  txCollateralStatus: string
  txWithdrawStatus: string  
  collateralBalance?: string
  collateralUsed?: string
  borrowLimit?: string
}

export type TAppState = {
    wallet: TWalletState
    cnm: TCnmState
}