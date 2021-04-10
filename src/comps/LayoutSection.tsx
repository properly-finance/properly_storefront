import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import useTheme from "@emmpair/hooks/useTheme"
import ConnectButton from "@emmpair/comps/ConnectButton"
import ThemeSwitch from "@emmpair/comps/ThemeSwitch"
import ToolBar from "@emmpair/comps/ToolBar"
import InfoPane from "@emmpair/comps/InfoPane"
// import SVG from "react-inlinesvg"
// import Properlylogo from "@assets/images/properly-logo.svg"
import ProperlylogoLight from "@assets/images/properly-logo-light-color-small.png"
import ProperlylogoDark from "@assets/images/properly-logo-dark-color-small.png"


interface ILayoutSection {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',    
    // flexDirection: "column",
    minHeight: `calc(100vh - ${theme.spacing(2) - 16 }px)`
  },

  /* 1 */
  sidebar: {
    // pass
  },
  /* 1.1 */  
  logoWrap:{
    paddingLeft: theme.spacing(2),
  },  
  logo:{
    // pass
    height: "75px",
    width: "150px",
  },  

  /* 2 */
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",    
  },
  /* 2.1 */
  header: {
    display: "flex",
    gridTemplateAreas: `"headerAnchor headerToolbar"`,
    [theme.breakpoints.down("sm")]: {
      gridTemplateAreas: `"headerToolbar headerAnchor"`},
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  /* 2.2 */
  content:{
    marginLeft: theme.spacing(3),
    // border: "2px solid green",
  },
}), { name: "LayoutSection" });


const LayoutSection: React.FC<ILayoutSection> = ({ children }) => {
  const classes = useStyles()
  const { isDark } = useTheme()  
  return (
    <div className={classes.root}>

      {/* 1 */}
      <div className={classes.sidebar}>
        {/* 1.1 */}
        <div className={classes.logoWrap}>
          <img 
            className={classes.logo} 
            src={isDark
              ? ProperlylogoDark
              : ProperlylogoLight
            } 
            alt='Properly'
          />  
        </div>
        {/* 1.2 */}
        <InfoPane/>
      </div>

      {/* 2 */}
      <div className={classes.body}>
        {/* 2.1 */}      
        <div className={classes.header}>
          <ToolBar />
          <ThemeSwitch />
          <ConnectButton />
        </div>
        {/* 2.2 */}        
        <div className={classes.content}>
          { children }
        </div>
      </div>

    </div>    
  )    
}

export default LayoutSection