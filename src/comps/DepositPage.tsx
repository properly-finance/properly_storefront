import React, { useState } from "react"
import { ethers } from "ethers"
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles'
import NumberFormat from 'react-number-format'
import Button from "@material-ui/core/Button"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Divider from '@material-ui/core/Divider'
import { deepOrange, green } from '@material-ui/core/colors'
import { trimElipsis } from "@emmpair/utils"


import { 
  pollDeposit,
  pollToken,
  useCollaterateDeposit,
  useWithdrawDeposit,
  useMintAsset,
  useApproveBurnAsset,
  useBurnAsset,
} from "@emmpair/hooks/useContract";
import { pollWallet } from "@emmpair/hooks/useWallet"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr"
    },
    display: "grid",
    gridColumnGap: theme.spacing(3),
    gridTemplateColumns: "1fr 400px"
  },
  formPane: {
    // flex: 1,
    // width: 400,
    padding: '0 !important',
    // minWidth: 400,    
  },
  infoPane :{
    backgroundColor: theme.palette.background.paper,
    minWidth: 400,
    maxWidth: 400,
    // marginLeft: theme.spacing(3),
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
    },
  },
  burnWrap: {
    display: "flex",
  },
  burnDivider: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),    
  },
}),{ name: "DepositPage" })

interface INumberFormatEth {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { value: string } }) => void
}

function NumberFormatEth(props: INumberFormatEth) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}      
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator={" "}
      isNumericString
    />
  )
}

const OrangeColorButton = withStyles((theme: Theme) => ({
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

type State = {
  depositAmount: string
  withdrawAmount: string
  mintAmount: string
  burnAmount: string
}

const DepositPage: React.FC = () => {  
  const classes = useStyles()    
  const [values, setValues] = useState<State>({
    depositAmount: "",
    withdrawAmount: "",
    mintAmount: "",
    burnAmount: "",    
  })

  const { account } = pollWallet()
  const { 
    txCollateralStatus,
    txWithdrawStatus,
    collateralBalance,
    collateralUsed,
    borrowLimit } = pollDeposit()
  const {
    txMintStatus,
    txBurnStatus,
    txApproveBurnStatus,
    balance,
    allowBurnBalance } = pollToken()

  const collaterateDeposit = useCollaterateDeposit()
  const mintAsset = useMintAsset()
  const burnAsset = useBurnAsset()
  const approveBurnAsset = useApproveBurnAsset()
  const withdrawDeposit = useWithdrawDeposit()

  function handleChange (prop: keyof State){
    return function(event: React.ChangeEvent<HTMLInputElement>){
      setValues({ ...values, [prop]: event.target.value });
    }
  }

  function handleDeposit(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    collaterateDeposit(account, values.depositAmount)
  }

  function handleMint(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    mintAsset(account, values.mintAmount)
  }

  function handleApproveBurn(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    approveBurnAsset(account, "99999999999999999999999")
  }

  function handleBurn(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    burnAsset(account, values.burnAmount)
  }

  function handleWithdraw(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    withdrawDeposit(account, values.withdrawAmount)
  }

  return (
    <div className={classes.root}>
      {/* 1 */}
      <List className={classes.formPane} disablePadding>

        {/* 1.1 */}
        <ListItem className={classes.firstItem}>          
          <FormControl className={classes.textField} variant="outlined">
            <InputLabel>
              Deposit Eth as Collateral
            </InputLabel>
            <OutlinedInput
              type="numberformat"
              value={values.depositAmount}
              onChange={handleChange('depositAmount')}
              endAdornment={
                <InputAdornment position="end">
                  Eth
                </InputAdornment>
              }
              inputComponent={ NumberFormatEth as any}
              autoFocus
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <Button
            className={txCollateralStatus == 'pending'
              ? classes.pendingButton
              : classes.button}
            color="primary"
            variant="contained"
            onClick={handleDeposit}
            type="submit"
            disabled={ txCollateralStatus == 'pending'
              || txWithdrawStatus == 'pending'
              || txMintStatus == 'pending'
              || txBurnStatus == 'pending'
              || txApproveBurnStatus == 'pending'
              || !account }
          >
            Deposit { txCollateralStatus != 'idle' &&  `${txCollateralStatus}...` }
          </Button>
        </ListItem>

        {/* 1.2 */}
        <ListItem>          
          <FormControl 
            className={classes.textField} variant="outlined">
            <InputLabel>
              Mint dLand
            </InputLabel>
            <OutlinedInput
              type="numberformat"
              value={values.mintAmount}
              onChange={handleChange('mintAmount')}
              endAdornment={
                <InputAdornment position="end">
                  dLand
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

        {/* 1.3 */}
        <ListItem>        
          <FormControl 
            className={classes.textField} 
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Burn dLand
            </InputLabel>
            <OutlinedInput
              type="numberformat"
              value={values.burnAmount}
              onChange={handleChange('burnAmount')}
              endAdornment={
                <InputAdornment position="end">
                  dLand
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
          <OrangeColorButton
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
          </OrangeColorButton>
        </ListItem>     

        {/* 1.4 */}
        <ListItem>     
          <FormControl 
            className={classes.textField} 
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Withdraw Eth
            </InputLabel>
            <OutlinedInput
              type="numberformat"
              value={values.withdrawAmount}
              onChange={handleChange('withdrawAmount')}
              endAdornment={
                <InputAdornment position="end">
                  Eth
                </InputAdornment>
              }
              labelWidth={70}
              inputComponent={ NumberFormatEth as any}
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <OrangeColorButton
            className={txWithdrawStatus == 'pending'
              ? classes.pendingButton
              : classes.button}
            color="primary"          
            variant="contained"
            onClick={handleWithdraw}
            type="submit"
            disabled={ txCollateralStatus == 'pending' 
              || txWithdrawStatus == 'pending'
              || txMintStatus == 'pending'
              || txBurnStatus == 'pending'
              || txApproveBurnStatus == 'pending'
              || !account }
          >
            Withdraw { txWithdrawStatus != 'idle' &&  `${txWithdrawStatus}...` }
          </OrangeColorButton>
        </ListItem>

      </List>
 

      {/* 2 */}
      <div>
        {/* 2.1 */}     
        <List 
          className={classes.infoPane}
          disablePadding
          dense>
          <ListItem>
            <ListItemText 
              primary="Collateral Balance"
              secondary={ collateralBalance 
                && `${ethers.utils.formatEther(collateralBalance)} Eth` 
                || '...'
              }/>
          </ListItem>
          <Divider component="li" />      
          <ListItem>
            <ListItemText 
              primary="Collateral Used"
              secondary={ collateralUsed
                && `${ethers.utils.formatEther(collateralUsed)} Eth`
                || '...'
              }/>
          </ListItem>
          <Divider component="li" />      
          <ListItem>
            <ListItemText 
              primary="Borrow Limit"
              secondary={ borrowLimit 
                && `${ethers.utils.formatEther(borrowLimit)} Eth`
                || '...' 
              }/>
          </ListItem>
        </List>
        {/* 2.2 */}
        <br/>
        <List 
          className={classes.infoPane}
          disablePadding
          dense>
          <ListItem>
            <ListItemText 
              primary="dLand Balance"
              secondary={ balance 
                && `${trimElipsis(ethers.utils.formatEther(balance))}` 
                || '...'
              }/>
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Allowance dLand burn"
              secondary={ allowBurnBalance
                && `${trimElipsis(ethers.utils.formatEther(allowBurnBalance))}` 
                || '...'}/>
          </ListItem>      
        </List>
      </div>
    </div>
  )
}

export default DepositPage