import React from "react";
import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Menu from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
// ..
import ArrowDropdown from "@emmpair/icons/ArrowDropdown";


const useStyles = makeStyles(
  theme => ({
    arrow: {
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0
      },
      marginLeft: theme.spacing(2),
      transition: theme.transitions.duration.standard + "ms"
    },
    arrowRotate: {
      transform: "rotate(180deg)"
    },    
    wrap: {
      position: "relative",
    },
    chip: {
      [theme.breakpoints.down("sm")]: {
        height: 48
      },
      backgroundColor: theme.palette.background.paper,
      borderRadius: 24,
      color: theme.palette.text.primary,
      height: 40,
      padding: theme.spacing(0.5)
    },
    label:{
      fontSize: "12pt",      
      display: 'flex',      
      alignItems: "center",
    },
    popover: {
      marginTop: theme.spacing(2),
      zIndex: 10
    },
    userMenuItem: {
      textAlign: "right"
    }
  }),
  { name: "ConnectButton" }
);

const ConnectButton: React.FC = () => {
  const classes = useStyles({});
  const anchor = useRef<HTMLDivElement>()
  const [isMenuOpened, setMenuState] = useState(false);  

  const handleMetaMask = () => {
    setMenuState(false);
    console.log('useConnectMetaMask')
    // useConnectMetaMask();
  };

  return (
    <div className={classes.wrap} ref={anchor}>
      <Chip
        className={ classes.chip }
        label={
          <div className={ classes.label }>
              <b>Connect</b>
            <ArrowDropdown className={classNames(classes.arrow, {
                [classes.arrowRotate]: isMenuOpened
              })}
            />
          </div>
        }
        onClick={() => setMenuState(!isMenuOpened)}
        data-test="connectMenu"
      />
      <Popper
        className={classes.popover}
        open={isMenuOpened}
        anchorEl={anchor.current}
        transition
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "right top" : "right bottom"
            }}
          >
            <Paper>
              <ClickAwayListener
                onClickAway={() => setMenuState(false)}
                mouseEvent="onClick"
              >
                <Menu>
                  <MenuItem
                    className={classes.userMenuItem}
                    onClick={handleMetaMask}                    
                    data-test="connectMetaMaskButton"
                  >
                    connect MetaMask
                  </MenuItem>
                </Menu>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>      
    </div>
  )
};


export default ConnectButton;