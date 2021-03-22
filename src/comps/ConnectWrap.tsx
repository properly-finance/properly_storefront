import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ConnectButton from "@emmpair/comps/ConnectButton";

const useStyles = makeStyles(
  () => ({
    wrap: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
  }),
  { name: "ConnectWrap" }
);

const ConnectWrap: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrap}>
      <ConnectButton>
        Connect
      </ConnectButton>
    </div>
  )
};


export default ConnectWrap;