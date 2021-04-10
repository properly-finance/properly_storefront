import React, { useState, useEffect } from "react"
import MetaMaskOnboarding from "@metamask/onboarding"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { pollWallet, useHandshakeWallet} from "@emmpair/hooks/useWallet"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: "center",
    width: "150px",
  },
  chip: {
    flex: 1,
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
}), { name: "ConnectButton" })

const ConnectButton: React.FC = () => {
  const classes = useStyles({})
  const handshakeHandle = useHandshakeWallet()
  const { hsStatus, account } = pollWallet()
  const [ isOK, setOK ] = useState(false)
  const [ labelText, setLabelText ] = useState('Connect')  

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOK(true)      
    } else {
      setOK(false)
      setLabelText('Install MetaMask')
    }
  }, [isOK])

  return (
    <div className={classes.root} >
      <Chip
        className={ classes.chip }
        onClick={ handshakeHandle }        
        label={
          <div className={ classes.label }>
            <b>
              { isOK
                ? hsStatus == 'idle' 
                  ? account
                    ? 'Connected'
                    : 'Connect'
                  : `${hsStatus}...`
                : labelText}
            </b>
          </div>
        }
        disabled={ isOK
                    ? hsStatus == 'idle' 
                      ? account
                        ? true
                        : false
                      : true 
                    : true }
      />
    </div>
  )
}

export default ConnectButton