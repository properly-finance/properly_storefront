// import { TProvider } from "./types"


export interface IAction {
  type: string
  payload?: any
}

export interface IAppState {
  wallet: {
    handshake: string
    account?: string
    network?: any
    balance?: string    
  }
  contract: {
    txStatus: string
    collateralBalance?: string
    collateralUsed?: string
    borrowLimit?: string
  }
}

