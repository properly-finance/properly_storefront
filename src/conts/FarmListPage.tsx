import React, { useEffect } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles, Theme } from '@material-ui/core/styles'
import PageToolBar from "@emmpair/comps/PageToolBar"
import useNavigator, { pollRouter } from "@emmpair/hooks/useNavigator"
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
  const { farms, limit, offset } = pollFarm()
  const { account } = pollWallet()  
  const fetchFarms = useFetchFarms()
  const navigate = useNavigator()

  useEffect(() => {
    // useFetchFarms(offset + limit, limit)
    fetchFarms(offset, limit)
  }, [ pathname ])

  return (
    <div className={classes.root}>
      <PageToolBar>
        <Button
          onClick={()=>{}}
          color="primary"
          variant="contained"
          disabled={!account}          
        >
          Add
        </Button>
      </PageToolBar>
      <FarmList 
        farms={farms}
        account={account}
        navigate={navigate}
      /> 
    </div>
  )
}

export default FarmListPage