import React from "react"
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TFarms } from "@emmpair/reducers/types"
import FarmCard from "./FarmCard"
import { useIncreaseFarmTokenAllowance } from "@emmpair/hooks/useContract"

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
}

const FarmList: React.FC<IFarmList> = (props) => {
  const { 
    farms,
    account,
    txFetchFarmsStatus,
    txIncreaseFarmTokenAllowanceStatus } = props
  const classes = useStyles()
  const increaseAllowance = useIncreaseFarmTokenAllowance()

  function handleApprove(
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, amount: string, farmKey: number,
  ){
    event.preventDefault()
    increaseAllowance(account, token, amount, farmKey)
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
              }
              handleApprove={handleApprove}
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