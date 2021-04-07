import createRootReducer from "./index"

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
  txApproveBurnStatus: string
  balance?: string
  allowBurnBalance?: string
}

export type TFarm = {
  name: string
  lpToken: string
  depositFeeBP: number
  accPROPPerShare: string
  allocPoint: string
  lastRewardBlock: string
}

export type TFarms = [Record<string, TFarm>]

export type TFarmState = {
  txFetchFarmsStatus: string
  txCreateFarmStatus: string
  txUpdateFarmStatus: string
  txDeleteFarmStatus: string  
  farms: [] | TFarms
  limit: number
  offset: number
  farmsCount: number
}

export type TAppState = {
    wallet: TWalletState
    deposit: TDepositState
    token: TTokenState
    farm: TFarmState
}

export type TRootState = ReturnType<ReturnType<typeof createRootReducer>>