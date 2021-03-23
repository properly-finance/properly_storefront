import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles, Theme } from "@material-ui/core/styles";
// import useTheme from "@emmpair/hooks/useTheme";
import ConnectButton from "./ConnectButton";
import ThemeSwitch from "./ThemeSwitch";
import HeaderToolBar from "./HeaderToolBar";
import InfoPane from "./InfoPane";



interface IAppLayout {
  children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',    
    flexDirection: "column",
    minHeight: `calc(100vh - ${theme.spacing(2) - 16 }px)`
  },
  header: {
    display: "flex",
    gridTemplateAreas: `"headerAnchor headerToolbar"`,
    [theme.breakpoints.down("sm")]: {
      gridTemplateAreas: `"headerToolbar headerAnchor"`},
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "16pt",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),      
    "& span": {
      color: theme.palette['textHighlighted']['active']
    }
  },
  body: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
    // border: "2px solid black",
  },
  infoPane: {
    width: "50%",
    // border: "2px solid red",
  },
  actionPane:{
    flexGrow: 1,
    // border: "2px solid green",
  },
}), { name: "AppLayout" });


const AppLayout: React.FC<IAppLayout> = ({ children }) => {
  const classes = useStyles({});

  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <b>Pro<span>perl</span>y</b><span>Fin</span>anc<span>E</span>
        </div>
        <HeaderToolBar />
        <ThemeSwitch />
        <ConnectButton />
      </div>
      <div className={classes.body}>
        <div className={classes.infoPane}>
          <InfoPane/>
        </div>
        <div className={classes.actionPane}>
          { children }        
        </div>        
      </div>
    </div>    
  )    
}

export default AppLayout