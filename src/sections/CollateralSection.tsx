import React, { useState } from "react";
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { deepOrange } from '@material-ui/core/colors';
import classNames from "classnames";

interface State {
  amount: string;
}

interface INumberFormatEth {
  inputRef: (instance: NumberFormat | null) => void;  
  onChange: (event: { target: { value: string } }) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: null,
    width: 400,
    padding: '0 !important',
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
    amount: "",
  });

  // @method!!!
  function handleChange (prop: keyof State){
    return function(event: React.ChangeEvent<HTMLInputElement>){
      setValues({ ...values, [prop]: event.target.value });
    }
  };  

  // @method!!!  
  function handleDeposit(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    console.log(values)
  }

  // @method!!!  
  function handleWithdraw(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault()
    console.log(values)
  }

  return (
    <List className={classes.root} disablePadding>
      <ListItem className={classes.firstItem}>          
        <FormControl 
          className={classNames({}, classes.textField)} 
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-amount">
            Amount
          </InputLabel>
          <OutlinedInput
            type="numberformat"
            value={values.amount}
            onChange={handleChange('amount')}
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
        >
          Deposit
        </Button>
      </ListItem>
      <ListItem>
        <ColorButton
          className={classes.button}
          color="primary"          
          variant="contained"
          onClick={handleWithdraw}
          type="submit"
          data-test="submit"
        >
          Withdraw
        </ColorButton>
      </ListItem>
    </List>
  )
}
