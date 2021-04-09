import React from "react"
import { makeStyles } from "@material-ui/core/styles"
// import { makeStyles, Theme } from "@material-ui/core/styles"
// import useTheme from "@emmpair/hooks/useTheme"
import ConnectButton from "@emmpair/comps/ConnectButton"
import ThemeSwitch from "@emmpair/comps/ThemeSwitch"
import ToolBar from "@emmpair/comps/ToolBar"
import InfoPane from "@emmpair/comps/InfoPane"
// import SVG from "react-inlinesvg"
// import Properlylogo from "@assets/images/properly-logo.svg"


interface ILayoutSection {
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
  // logoSVG:{
  //   display: "table-cell",
  //   verticalAlign: "middle",
  //   height: "50%",    
  // },
  // logoSVGWrap:{
  //   height: "48px",
  //   display: "table",
  //   textAlign: "left",
  // },
  body: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
    // border: "2px solid black",
  },
  infoPane: {
    // width: "50%",
    // border: "2px solid red",
  },
  actionPane:{
    flexGrow: 1,
    marginLeft: theme.spacing(3),
    // border: "2px solid green",
  },
}), { name: "LayoutSection" });


const LayoutSection: React.FC<ILayoutSection> = ({ children }) => {
  const classes = useStyles({});
  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <b>Pro<span>perl</span>y</b><span>Fin</span>anc<span>E</span>
        </div>
        {/*
        <div className={classes.logoSVGWrap}>
          <SVG className={classes.logoSVG} src={Properlylogo} />      
        </div>
        */}
        <ToolBar />
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

export default LayoutSection