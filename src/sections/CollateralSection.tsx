import React, { useState } from "react";
import { ethers } from "ethers";
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
import Divider from '@material-ui/core/Divider';
import { deepOrange } from '@material-ui/core/colors';
import classNames from "classnames";
import { pollCnm, useCollateralizeEth, useWithdrawCollateral } from "@emmpair/hooks/useContract";
import { pollWallet } from "@emmpair/hooks/useWallet";


type State = {
  depositAmount: string;
  withdrawAmount: string;  
}

interface INumberFormatEth {
  inputRef: (instance: NumberFormat | null) => void;  
  onChange: (event: { target: { value: string } }) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  sectionWrap: {
    display: "flex",
    alignItems: "flex-start",
  },
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
  }
}),{ name: "CollateralSection" });

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(Button);

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
        });
      }}
      thousandSeparator={" "}
      isNumericString
    />
  );
}


export default function CollateralSection():JSX.Element {
  const classes = useStyles();    
  const [values, setValues] = useState<State>({
    depositAmount: "",
    withdrawAmount: "",
  });
  const { txCollateralStatus, txWithdrawStatus,
          collateralBalance, collateralUsed, borrowLimit } = pollCnm();
  const { account } = pollWallet();          
  const collateralizeEth = useCollateralizeEth();
  const withdrawCollateral = useWithdrawCollateral();  

  // @method!!!
  function handleChange (prop: keyof State){
    return function(event: React.ChangeEvent<HTMLInputElement>){
      setValues({ ...values, [prop]: event.target.value });
    }
  };  

  // @method!!!  
  function handleDeposit(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    collateralizeEth(account, values.depositAmount)
  }

  // @method!!!  
  function handleWithdraw(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    withdrawCollateral(account, values.withdrawAmount)
  }

  return (
    <div className={classes.sectionWrap}>
      <List className={classes.formPane} disablePadding>
        <ListItem className={classes.firstItem}>          
          <FormControl 
            className={classNames({}, classes.textField)} 
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Deposit Amount
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
              labelWidth={70}
              inputComponent={ NumberFormatEth as any}
              autoFocus
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={handleDeposit}
            type="submit"
            data-test="submit"
            disabled={ txCollateralStatus == 'pending'
              || txWithdrawStatus == 'pending'
              || !account }
          >
            Deposit { txCollateralStatus != 'idle' &&  `${txCollateralStatus}...` }
          </Button>
        </ListItem>
        <ListItem>        
          <FormControl 
            className={classNames({}, classes.textField)} 
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Withdraw Amount
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
          <ColorButton
            className={classes.button}
            color="primary"          
            variant="contained"
            onClick={handleWithdraw}
            type="submit"
            data-test="submit"
            disabled={ txCollateralStatus == 'pending' 
              || txWithdrawStatus == 'pending'
              || !account }
          >
            Withdraw { txWithdrawStatus != 'idle' &&  `${txWithdrawStatus}...` }
          </ColorButton>
        </ListItem>
      </List>

      <List className={classes.infoPane} disablePadding dense >
        <ListItem>
          <ListItemText primary="Collateral Balance"
                        secondary={ collateralBalance 
                          && `${ethers.utils.formatEther(collateralBalance)} Eth` 
                          || '...'}/>
        </ListItem>
        <Divider component="li" />      
        <ListItem>
          <ListItemText primary="Collateral Used"
                        secondary={ collateralUsed
                           && `${ethers.utils.formatEther(collateralUsed)} Eth`
                           || '...'}/>
        </ListItem>
        <Divider component="li" />      
        <ListItem>
          <ListItemText primary="Borrow Limit"
                        secondary={ borrowLimit 
                          && `${ethers.utils.formatEther(borrowLimit)} Eth`
                          || '...' }/>
        </ListItem>
      </List>

    </div>
  )
}
