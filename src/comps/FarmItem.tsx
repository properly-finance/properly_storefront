import React from "react"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
  },
}),{ name: "FarmItem" })

const FarmItem: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      FarmItem
    </div>
  )
}

export default FarmItem