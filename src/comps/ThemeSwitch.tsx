import React from "react";
import Switch from "@material-ui/core/Switch";
import { makeStyles, Theme } from "@material-ui/core/styles";
import useTheme from "@emmpair/hooks/useTheme";
import MoonIcon from "@emmpair/icons/Moon";
import SunIcon from "@emmpair/icons/Sun";


// const useStyles = makeStyles(
//   () => ({
//     switch: {
//       "&&:hover": {
//         background: "transparent"
//       }
//     },
//   }),
//   {
//     name: "ThemeSwitch"
//   }
// );

const useStyles = makeStyles((theme: Theme) => ({
  checked: {
    "& svg": {
      background: theme.palette.primary.main,
      color: theme.palette.background.paper
    }
  },
  colorPrimary: {},
  root: {
    "& svg": {
      background: theme.palette.primary.main,
      borderRadius: "100%",
      height: 20,
      width: 20
    }
  },
  track: {
    "$colorPrimary$checked + &": {
      backgroundColor: theme.palette.background.paper
    },
    background: theme.palette.background.paper
  }
}),{ name: "ThemeSwitch"})

const ThemeSwitch: React.FC = () => {
  const classes = useStyles({});
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
     <Switch
        classes={classes}
        checked={isDark}
        onChange={toggleTheme}
        color="primary"
        icon={<SunIcon />}
        checkedIcon={<MoonIcon />}        
        disableRipple
      />
    </>
  )
}

export default ThemeSwitch