import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { appLoaderHeight } from "@emmpair/consts";
import ConnectWrap from "@emmpair/comps/ConnectWrap";
import BodyWrap from "@emmpair/comps/BodyWrap";

const useStyles = makeStyles(
  theme => ({
    wrap: {
      display: "flex",
      flexDirection: "column",
      minHeight: `calc(100vh - ${theme.spacing(2) + appLoaderHeight + 70}px)`
    },
    header: {
      width: "100%",
      display: "grid",
      gridTemplateAreas: `"headerAnchor headerToolbar"`,
      [theme.breakpoints.down("sm")]: {
        gridTemplateAreas: `"headerToolbar" "headerAnchor"`
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3, 3)
      },
      padding: theme.spacing(1, 1),
      background: `#B9C7E6`,
    },
    connect:{
      background: `#C3C2FF`,
    },
    logo: {
      display: 'flex',
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "16pt",
      "& span": {
        color: "#117286"
      }
    },
    body: {
      flex: 1,
      width: "100%",
    }
  }),
  { name: "HomePage" }
);

const HomePage: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <b>Pro<span>perl</span>y</b><span>Fin</span>anc<span>e</span>
        </div>
        <ConnectWrap />
      </div>
      <BodyWrap />
    </div>
  )
};

HomePage.displayName = "HomePage";
export default HomePage;