import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import PageToolBar from "@emmpair/comps/PageToolBar"
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from "@emmpair/icons/ArrowBack"
import useNavigator from "@emmpair/hooks/useNavigator"
import FarmItem from "@emmpair/comps/FarmItem"


const useStyles = makeStyles(() => ({
  root: {
  },
}),{ name: "FarmItemPage" })

const FarmItemPage: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigator()  
  // const { location:{ pathname }} = pollRouter()  

  return (
    <div className={classes.root}>
      <PageToolBar>
        <IconButton onClick={()=>navigate('/farm')}>
          <ArrowBackIcon/>
        </IconButton>
      </PageToolBar>
      <FarmItem/>
    </div>
  )
}

export default FarmItemPage