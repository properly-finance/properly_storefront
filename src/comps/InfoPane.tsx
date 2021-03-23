import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(2),      
    },
    dividerFullWidth: {
      margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    dividerInset: {
      margin: `5px 0 0 ${theme.spacing(9)}px`,
    },
  }),
);

export default function InfoPane() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText primary="Address:" secondary=",,," />
      </ListItem>
      <Divider component="li" />
      <li>
        <Typography
          className={classes.dividerFullWidth}
          color="textSecondary"
          display="block"
          variant="caption"
        >
        </Typography>
      </li>
      <ListItem>
        <ListItemText primary="Network name:" secondary="..." />
      </ListItem>
      <Divider component="li" />
      <li>
        <Typography
          className={classes.dividerInset}
          color="textSecondary"
          display="block"
          variant="caption"
        >
        </Typography>
      </li>
    </List>
  );
}
