import React, { useEffect } from "react"
import { makeStyles, Theme } from '@material-ui/core/styles'
import { pollRouter } from "@emmpair/hooks/useNavigator"
import FarmList from "@emmpair/comps/FarmList"
import { pollFarm, useFetchFarms } from "@emmpair/hooks/useContract"
import { pollWallet } from "@emmpair/hooks/useWallet"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginRight: theme.spacing(2)
  },
}),{ name: "FarmListPage" })

const FarmListPage: React.FC = () => {
  const classes = useStyles()
  const { location:{ pathname }} = pollRouter()
  const { farms, limit, offset,
          txFetchFarmsStatus,
          txIncreaseFarmTokenAllowanceStatus,
          txDepositFarmStatus,
          txWithdrawFarmStatus } = pollFarm()
  const { account } = pollWallet()  
  const fetchFarms = useFetchFarms()

  useEffect(() => {
    // useFetchFarms(offset + limit, limit)
    fetchFarms(account, offset, limit)
  }, [ pathname, account ])

  return (
    <div className={classes.root}>
      <FarmList 
        farms={farms}
        account={account}
        txFetchFarmsStatus={txFetchFarmsStatus}
        txIncreaseFarmTokenAllowanceStatus={txIncreaseFarmTokenAllowanceStatus}
        txDepositFarmStatus={txDepositFarmStatus}
        txWithdrawFarmStatus={txWithdrawFarmStatus}
      /> 
    </div>
  )
}

export default FarmListPage