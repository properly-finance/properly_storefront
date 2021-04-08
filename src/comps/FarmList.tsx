import React from "react"
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TFarms } from "@emmpair/reducers/types"
import FarmCard from "./FarmCard"
import {
  useIncreaseFarmTokenAllowance,
  useDepositFarm } from "@emmpair/hooks/useContract"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  configurationItem: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    },
    display: "grid",
    gridColumnGap: theme.spacing(4),
    gridTemplateColumns: "1fr 1fr"
  },
}),{ name: "FarmList" })

interface IFarmList {
  farms: [] | TFarms
  account?: string
  txFetchFarmsStatus: string
  txIncreaseFarmTokenAllowanceStatus: string
  txDepositFarmStatus: string
}

const FarmList: React.FC<IFarmList> = (props) => {
  const { 
    farms,
    account,
    txFetchFarmsStatus,
    txIncreaseFarmTokenAllowanceStatus,
    txDepositFarmStatus } = props
  const classes = useStyles()
  const increaseAllowance = useIncreaseFarmTokenAllowance()
  const deposit = useDepositFarm()

  function handleApprove(
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, amount: string, farmKey: number,
  ){
    event.preventDefault()
    increaseAllowance(account, token, amount, farmKey)
  }

  function handleDeposit(
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, amount: string, farmPid: number, farmKey: number,
  ){
    event.preventDefault()
    deposit(account, token, amount, farmPid, farmKey)
  }

  return (
    <div className={classes.root}>
      { farms.length ? (
        <div className={classes.configurationItem}>
          {farms.map((farm, key) => (
            <FarmCard 
              key={key}
              farm={farm}
              farmKey={key}
              disabled={!account
                || txFetchFarmsStatus == 'pending'
                || txIncreaseFarmTokenAllowanceStatus == 'pending'
                || txDepositFarmStatus == 'pending'
              }
              handleApprove={handleApprove}
              handleDeposit={handleDeposit}
            />
          ))}
        </div>
      ) : (
        <h2>
          Loading...
        </h2>        
      )}
    </div>
  )
}

export default FarmList