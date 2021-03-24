import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useNavigator from "@emmpair/hooks/useNavigator";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
},{ name: "HeaderToolBar" });


type THTMLInputElement = HTMLInputElement & {
  href: string
}


export const HeaderToolBar: React.FC = () => {
  const navigate = useNavigator();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange (e: React.ChangeEvent<THTMLInputElement>, v: number) {
    e.preventDefault();
    setValue(v);
    navigate(v == 0 ? "/" : e.currentTarget.href.replace(/http[s]?:[\/:]+[a-z]+:\d+/i, ''));
  };

  return (
    <div className={classes.root}>    
      <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Deposit Collateral" href="" />
          <Tab label="Withdraw Collateral" href="withdraw-collateral" />
          <Tab label="Mint Token" href="mint-token" />
          <Tab label="Burn Token" href="burn-token" />          
      </Tabs>
    </div>   
  )
};

export default HeaderToolBar;





