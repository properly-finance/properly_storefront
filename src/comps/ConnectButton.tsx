import React from "react";
// import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { pollWallet,
         useHandshakeWallet, 
         checkMetaMaskWallet } from "@emmpair/hooks/useWallet"


const useStyles = makeStyles(
  theme => ({
    wrap: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      display: 'flex',
      alignItems: "center",
    },
    chip: {
      [theme.breakpoints.down("sm")]: {
        height: 48
      },
      backgroundColor: theme.palette.background.paper,
      borderRadius: 24,
      color: theme.palette.text.primary,
      height: 40,
      padding: theme.spacing(0.5)
    },
    label:{
      fontSize: "12pt",
      display: 'flex',      
      alignItems: "center",
      '& b': {
        '&:first-letter': {
          textTransform: "capitalize",
        }
      }
    },
  }),
  { name: "ConnectButton" }
);

const ConnectButton: React.FC = () => {
  const classes = useStyles({});
  const handshakeHandle = useHandshakeWallet();
  const { hsStatus, account } = pollWallet();
  const [mmIsOK, mmLabelText] = checkMetaMaskWallet();
  
  return (
    <div className={classes.wrap} >
      <Chip
        className={ classes.chip }
        onClick={ handshakeHandle }        
        label={
          <div className={ classes.label }>
            <b>
              { mmIsOK
                ? hsStatus == 'idle' 
                  ? account
                    ? 'Connected'
                    : 'Connect'
                  : `${hsStatus}...`
                : mmLabelText}
            </b>
          </div>
        }
        disabled={ mmIsOK
                    ? hsStatus == 'idle' 
                      ? account
                        ? true
                        : false
                      : true 
                    : true }
        data-test="connectMenu"
      />
    </div>
  )
};

export default ConnectButton;