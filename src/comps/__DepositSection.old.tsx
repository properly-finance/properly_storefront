import React from "react"
import { makeStyles, Theme } from '@material-ui/core/styles'
import WindowTitle from "@emmpair/comps/WindowTitle"
import CollateralPane from "@emmpair/comps/CollateralPane"
import MintPane from "@emmpair/comps/MintPane"
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles((theme: Theme) => ({
  sectionWrap: {
    display: "flex",
    alignItems: "flex-start",
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),    
  },
}),{ name: "DepositSection" });

export default function DepositSection():JSX.Element {
  const classes = useStyles();    
  return (
    <>
    <WindowTitle title={'Collateral & Mint | Properly'} />    
    <div className={classes.sectionWrap}>
      <CollateralPane />
    </div>
    <Divider variant="middle" className={classes.divider} />
    <div className={classes.sectionWrap}>
      <MintPane />
    </div>
    </>
  )
}
