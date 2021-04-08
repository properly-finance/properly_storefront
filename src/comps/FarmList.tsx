import React from "react"
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TFarms } from "@emmpair/reducers/types"
import FarmCard from "./FarmCard"
import { useIncreaseFarmTokenAllowance,
         useDepositFarm,
         useWithdrawFarm } from "@emmpair/hooks/useContract"

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
  txWithdrawFarmStatus: string
}

const FarmList: React.FC<IFarmList> = (props) => {
  const { 
    farms,
    account,
    txFetchFarmsStatus,
    txIncreaseFarmTokenAllowanceStatus,
    txDepositFarmStatus,
    txWithdrawFarmStatus } = props
  const classes = useStyles()
  const increaseAllowance = useIncreaseFarmTokenAllowance()
  const deposit = useDepositFarm()
  const withdraw = useWithdrawFarm()

  function handleApprove(
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, farmKey: number,
  ){
    event.preventDefault()
    increaseAllowance(account, token, "99999999999999999999999", farmKey)
  }

  function handleDeposit(
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, amount: string, farmPid: number, farmKey: number,
  ){
    event.preventDefault()
    deposit(account, token, amount, farmPid, farmKey)
  }

  function handleHarverst(
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, farmPid: number, farmKey: number,
  ){
    event.preventDefault()
    deposit(account, token, "0", farmPid, farmKey)
  }

  function handleWithdraw(
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, amount: string, farmPid: number, farmKey: number,
  ){
    event.preventDefault()
    withdraw(account, token, amount, farmPid, farmKey)
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
                || txWithdrawFarmStatus == 'pending'
              }
              handleApprove={handleApprove}
              handleDeposit={handleDeposit}
              handleHarverst={handleHarverst}
              handleWithdraw={handleWithdraw}
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