import { createSlice } from '@reduxjs/toolkit'


export const contractSlice = createSlice({
  name: 'contract',
  initialState: {
    collateralBalance: undefined,
    collateralUsed: undefined,
    borrowLimit: undefined,
  },
  reducers: {
    contractCollateralAction(state, { payload: {
        collateralBalance,
        collateralUsed,
        borrowLimit,
    }}) {
      state.collateralBalance = collateralBalance
      state.collateralUsed = collateralUsed
      state.borrowLimit = borrowLimit
    },
  }
})

const { actions, reducer } = contractSlice
export const { contractCollateralAction } = actions
export default reducer
