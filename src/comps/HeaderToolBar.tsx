import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import useNavigator from "@emmpair/hooks/useNavigator";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
},{ name: "HeaderToolBar" });


type THTMLInputElement = HTMLInputElement & {href: string}


export const HeaderToolBar: React.FC = () => {
  // const navigate = useNavigator();

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    e: React.ChangeEvent<THTMLInputElement>,
    newValue: number
  ) => {
    e.preventDefault();
    setValue(newValue);
    console.log(e.currentTarget.href)
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
          <Tab label="Item One" href="/one" />
          <Tab label="Item Two" href="/two" />
          <Tab label="Item Three" href="/three" />
      </Tabs>
    </div>   
  )
};

export default HeaderToolBar;

