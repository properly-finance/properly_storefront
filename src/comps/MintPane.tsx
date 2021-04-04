import React, { useState } from "react";
// import { ethers } from "ethers";
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
import { deepOrange, green } from '@material-ui/core/colors';
import classNames from "classnames";
import { pollDeposit, pollToken,
         useMintAsset, useApproveBurnAsset, useBurnAsset } from "@emmpair/hooks/useContract";
import { pollWallet } from "@emmpair/hooks/useWallet";

type State = {
  mintAmount: string;
  burnAmount: string;  
}

interface INumberFormatEth {
  inputRef: (instance: NumberFormat | null) => void;  
  onChange: (event: { target: { value: string } }) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  formPane: {
    flex: 1,
    width: 400,
    padding: '0 !important',
    minWidth: 400,    
  },
  infoPane :{
    backgroundColor: theme.palette.background.paper,
    minWidth: 400,
    maxWidth: 400,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    "& li": {
      "& div": {
        "& div": {
          fontWeight: 600,
        },
      },
    },
  },
  firstItem: {
    paddingTop: "0 !important",    
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  button:{
    width: '100%',    
  },
  pendingButton:{
    width: '100%',    
    "& span.MuiButton-label": {
      color: theme.palette["textHighlighted"]["active"],
    }
  },
  burnWrap: {
    display: "flex",
  },
  burnDivider: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),    
  },
}),{ name: "CollateralPane" })

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(Button)

const GreenColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button)

function NumberFormatEth(props: INumberFormatEth) {
  const { inputRef, onChange, ...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}      
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator={" "}
      isNumericString
    />
  )
}


export default function MintPane():JSX.Element {
  const classes = useStyles()
  const [values, setValues] = useState<State>({
    mintAmount: "",
    burnAmount: "",
  })
  const { txMintStatus, txBurnStatus, txApproveBurnStatus,
          balance, allowBurnBalance } = pollToken()
  const { txCollateralStatus, txWithdrawStatus } = pollDeposit()
  const { account } = pollWallet()
  const mintAsset = useMintAsset()
  const burnAsset = useBurnAsset()
  const approveBurnAsset = useApproveBurnAsset()

  // @method!!!
  function handleChange (prop: keyof State){
    return function(event: React.ChangeEvent<HTMLInputElement>){
      setValues({ ...values, [prop]: event.target.value })
    }
  }

  function handleMint(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    mintAsset(account, values.mintAmount)
    // console.log(values.mintAmount)
  }

  function handleApproveBurn(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    approveBurnAsset(account, values.burnAmount)
    // console.log(values.burnAmount)
  }

  function handleBurn(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    burnAsset(account, values.burnAmount)
    // console.log(values.burnAmount)
  }

  return (
    <>
    <List className={classes.formPane} disablePadding>
      <ListItem>          
        <FormControl 
          className={classNames({}, classes.textField)} 
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            Mint Amount
          </InputLabel>
          <OutlinedInput
            type="numberformat"
            value={values.mintAmount}
            onChange={handleChange('mintAmount')}
            endAdornment={
              <InputAdornment position="end">
                Token
              </InputAdornment>
            }
            labelWidth={70}
            inputComponent={ NumberFormatEth as any}
          />
        </FormControl>
      </ListItem>
      <ListItem>
        <Button
          className={txMintStatus == 'pending'
            ? classes.pendingButton
            : classes.button}
          color="primary"
          variant="contained"
          onClick={handleMint}
          type="submit"
          data-test="submit"
          disabled={ txMintStatus == 'pending'
            || txBurnStatus == 'pending'
            || txApproveBurnStatus == 'pending'
            || txCollateralStatus == 'pending'
            || txWithdrawStatus == 'pending'
            || !account }
        >
          Mint { txMintStatus != 'idle' &&  `${txMintStatus}...` }
        </Button>
      </ListItem>
      <ListItem>        
        <FormControl 
          className={classNames({}, classes.textField)} 
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            Burn Amount
          </InputLabel>
          <OutlinedInput
            type="numberformat"
            value={values.burnAmount}
            onChange={handleChange('burnAmount')}
            endAdornment={
              <InputAdornment position="end">
                Token
              </InputAdornment>
            }
            labelWidth={70}
            inputComponent={ NumberFormatEth as any}
          />
        </FormControl>
      </ListItem>
      <ListItem className={classes.burnWrap}>
        <GreenColorButton
          className={txApproveBurnStatus == 'pending'
            ? classes.pendingButton
            : classes.button}
          color="primary"          
          variant="contained"
          onClick={handleApproveBurn}
          type="submit"
          data-test="submit"
          disabled={ txMintStatus == 'pending'
            || txBurnStatus == 'pending'
            || txApproveBurnStatus == 'pending'
            || txCollateralStatus == 'pending'
            || txWithdrawStatus == 'pending'
            || !account }
        >
          Approve { txApproveBurnStatus != 'idle' &&  `${txApproveBurnStatus}...` }
        </GreenColorButton>
        <div className={classes.burnDivider} />
        <ColorButton
          className={txBurnStatus == 'pending'
            ? classes.pendingButton
            : classes.button}
          color="primary"          
          variant="contained"
          onClick={handleBurn}
          type="submit"
          data-test="submit"
          disabled={ txMintStatus == 'pending'
            || txBurnStatus == 'pending'
            || txApproveBurnStatus == 'pending'
            || txCollateralStatus == 'pending'
            || txWithdrawStatus == 'pending'
            || !account }
        >
          Burn { txBurnStatus != 'idle' &&  `${txBurnStatus}...` }
        </ColorButton>
      </ListItem>
    </List>

    <List className={classes.infoPane} disablePadding dense >
      <ListItem>
        <ListItemText primary="Token Balance"
                      secondary={ balance 
                        && `${balance} Token` 
                        || '...'}/>
      </ListItem>
      <ListItem>
        <ListItemText primary="Allowance burn"
                      secondary={ allowBurnBalance
                        && `${allowBurnBalance} Token` 
                        || '...'}/>
      </ListItem>      
    </List>
    </>
  )
}
