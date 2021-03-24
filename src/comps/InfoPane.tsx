import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ethers } from "ethers";
import { pollWallet } from "@emmpair/hooks/useWallet";
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      gridRowGap: 0,
      // margin: theme.spacing(2),
    },
  }),
);

export default function InfoPane() {
  const classes = useStyles();
  const { account, network, balance } = pollWallet()  

  return (
    <List className={classes.root}
          disablePadding={true} 
          dense={true}>
      <ListItem>
        <ListItemText primary="Address"
                      secondary={ account || 'undefined'}/>
      </ListItem>
      <Divider component="li" />      
      <ListItem>
        <ListItemText primary="Network name"
                      secondary={ network?.name || 'undefined'}/>
      </ListItem>
      <Divider component="li" />      
      <ListItem>
        <ListItemText primary="Balance"
                      secondary={ balance && ethers.utils.formatEther(balance) || 'undefined' }/>
      </ListItem>      
    </List>
  );
}
