import React from "react";
import { ethers } from "ethers";
import { makeStyles } from "@material-ui/core/styles";
import { pollWallet } from "@emmpair/hooks/useWallet";

const useStyles = makeStyles(
  (theme) => ({
    wrap: {
      flex: 1,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3, 3)
      },
      padding: theme.spacing(1, 1),
    },
  }),
  { name: "BodyWrap" }
);

const BodyWrap: React.FC = () => {
  const classes = useStyles()
  const { account, network, balance } = pollWallet()

  return (
    <div className={classes.wrap}>
      <p>Address: { account || 'undefined'}</p>
      <p>Network name: { network?.name || 'undefined'}</p>
      <p>Balance: { balance && ethers.utils.formatEther(balance) || 'undefined' }</p>
    </div>
  )
};

export default BodyWrap;