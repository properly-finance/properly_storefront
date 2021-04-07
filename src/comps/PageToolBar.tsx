import React from "react"
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    display: "flex",
    marginBottom: theme.spacing(2)
  },
}),{ name: "PageToolBar" })

interface IPageToolBar {
  children?: React.ReactNode;
}

const PageToolBar: React.FC<IPageToolBar> = (props) => {
  const { children } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

export default PageToolBar