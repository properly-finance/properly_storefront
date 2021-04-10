import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles'
import { TFarm } from "@emmpair/reducers/types"
import Warehouses from "@emmpair/icons/Warehouses"
import OutlinedInput from '@material-ui/core/OutlinedInput'
// import InputAdornment from '@material-ui/core/InputAdornment'
import NumberFormat from 'react-number-format'
import { green, deepOrange } from '@material-ui/core/colors'

import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  card: {
    "&:hover": {
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15);"
    },
    // cursor: "pointer",
    marginBottom: theme.spacing(3),
    transition: theme.transitions.duration.standard + "ms"
  },
  cardContent: {
    // Overrides Material-UI default theme
    "&:last-child": {
      paddingBottom: 16
    },
    display: "grid",
    gridColumnGap: theme.spacing(4),
    gridTemplateColumns: "48px 1fr"
  },
  cardContentDisabled: {
    "& $icon, & $sectionTitle, & $sectionDescription": {
      color: theme.palette.text.disabled
    },
    marginBottom: theme.spacing(3)
  },
  icon: {
    "& path": {
      fill: theme.palette.primary.main
    },
    fontSize: 48
  },
  sectionDescription: {
    // pass
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 600 as 600
  },
  actionRoot:{
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  actionFormControl:{
    marginTop: theme.spacing(1),
    display: "grid",
    gridColumnGap: theme.spacing(1),    
    gridTemplateColumns: "1fr 100px"    
  },
  actionBotton:{
    marginTop: theme.spacing(1),    
  },
  pendingButton:{
    width: '100%',    
    "& span.MuiButton-label": {
      color: theme.palette["textHighlighted"]["active"],
    }
  },
  button:{
    // pass
  },
}),{ name: "FarmCard" })

interface INumberFormatToken {
  inputRef: (instance: NumberFormat | null) => void;  
  onChange: (event: { target: { value: string } }) => void;
}

function NumberFormatToken(props: INumberFormatToken) {
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

const GreenColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button)

const OrangeColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(Button)

// const DeepPurpleColorButton = withStyles((theme: Theme) => ({
//   root: {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
//     '&:hover': {
//       backgroundColor: deepPurple[700],
//     },
//   },
// }))(Button)

type State = {
  depositAmount: string
  withdrawAmount: string
}

interface IFarmCard {
  farm: TFarm
  farmKey: number
  disabled: boolean

  handleApprove: (
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, farmKey: number,
  ) => void
  handleDeposit: (
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, amount: string, farmPid: number, farmKey: number,
  ) => void
  handleHarverst: (
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, farmPid: number, farmKey: number,
  ) => void
  handleWithdraw: (
    event: React.MouseEvent<HTMLButtonElement>,
    token: string, amount: string, farmPid: number, farmKey: number,
  ) => void
}

const FarmCard: React.FC<IFarmCard> = (props) => {
  const { 
    farm,
    farmKey,
    disabled,
    handleApprove,
    handleDeposit,
    handleHarverst,
    handleWithdraw } = props

  const [values, setValues] = useState<State>({
    depositAmount: "",
    withdrawAmount: "",
  })

  const classes = useStyles()

  function handleChange (prop: keyof State){
    return function(event: React.ChangeEvent<HTMLInputElement>){
      setValues({ ...values, [prop]: event.target.value })
    }
  }

  return (
    <>
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className={classes.icon}>
          <Warehouses fontSize="inherit" viewBox="0 0 44 44"/>
        </div>
        <div>
          <Typography 
            className={classes.sectionTitle}
            color="primary"
          >
            {farm.name} Farm
          </Typography>
          <Typography 
            className={classes.sectionDescription}
          >
            <b>Deposit fee: </b>{farm.depositFeeBP > 0
              ? farm.depositFeeBP / 100
              : 0 } %
            <br/>
            <b>Amount Deposited: </b>{farm.amount ? farm.amount : "..."}
            <br/>
            <b>Rewards: </b>{farm.rewardDebt ? farm.rewardDebt : "..."}              
          </Typography>
          <div className={classes.actionRoot}>
            <GreenColorButton
              color="primary"
              variant="contained"
              type="submit"
              onClick={(event) => handleApprove(
                event, 
                farm.lpToken,
                farmKey,
              )}
              disabled={disabled}
            >
              Approve
            </GreenColorButton>
            <div className={classes.actionFormControl}>
              <FormControl variant="outlined">
                <OutlinedInput
                  type="numberformat"
                  value={values.depositAmount}
                  onChange={handleChange('depositAmount')}
                  labelWidth={70}
                  inputComponent={NumberFormatToken as any}
                  margin="dense"
                />
                <FormHelperText>
                  <b>
                    {farm.tokenBalance 
                      ? `Token Balance: ${farm.tokenBalance}` 
                      : "..."}
                  </b>
                </FormHelperText>                
              </FormControl>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={(event) => handleDeposit(
                  event,
                  farm.lpToken,
                  values.depositAmount,
                  farm.pid,
                  farmKey,
                )}
                disabled={disabled || Number(farm.allowance) == 0}
              >
                Deposit
              </Button>
            </div>
            <OrangeColorButton
              className={classes.actionBotton}
              color="primary"
              variant="contained"
              type="submit"
              onClick={(event) => handleHarverst(
                event,
                farm.lpToken,
                farm.pid,
                farmKey,
              )}
              disabled={disabled}
            >
              Harvest
            </OrangeColorButton>
            <div className={classes.actionFormControl}>
              <OutlinedInput
                type="numberformat"
                value={values.withdrawAmount}
                onChange={handleChange('withdrawAmount')}
                labelWidth={70}
                inputComponent={NumberFormatToken as any}
                margin="dense"
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={(event) => handleWithdraw(
                  event,
                  farm.lpToken,
                  values.withdrawAmount,
                  farm.pid,
                  farmKey,
                )}
                disabled={disabled}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  )
}

export default FarmCard