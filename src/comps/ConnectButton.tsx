import React from "react";
// import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { pollWallet,
         useHandshakeWallet, 
         checkMetaMaskWallet } from "@emmpair/hooks/useWallet"


const useStyles = makeStyles(
  theme => ({
    arrow: {
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0
      },
      marginLeft: theme.spacing(2),
      transition: theme.transitions.duration.standard + "ms"
    },
    arrowRotate: {
      transform: "rotate(180deg)"
    },    
    wrap: {
      position: "relative",
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
  const { handshake: handshakeState, account } = pollWallet();
  const [mmIsOK, mmLabelText] = checkMetaMaskWallet();
  
  return (
    <div className={classes.wrap} >
      <Chip
        className={ classes.chip }
        label={
          <div className={ classes.label }>
            <b>
              { mmIsOK
                ? handshakeState == 'idle' 
                  ? account
                    ? 'Connected'
                    : 'Connect'
                  : `${handshakeState}...`
                : mmLabelText}
            </b>
          </div>
        }
        onClick={ handshakeHandle }
        disabled={ mmIsOK
                    ? handshakeState == 'idle' 
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