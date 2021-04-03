import { ethers } from "ethers"
import store from "./store"

export type TAppDispatch = typeof store.dispatch
export type TProvider = ethers.providers.Web3Provider
export type TAction = {
  type: string
  payload?: any
}
