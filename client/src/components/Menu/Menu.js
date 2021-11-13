import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import { signout, isAuthenticated } from '../../auth';

const useStyles = makeStyles((theme) => ({
  menuBar: {
    display: 'flex',
  },
  page: {
    width: '100vw',
    background: '#fefefe',
    padding: theme.spacing(3),
    paddingBottom: 0,
    paddingTop: 0,
  },
  toolbar: theme.mixins.toolbar,
}));
const Menu = (props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      <AppBar elevation={0}>
        <Toolbar>
          <List className={classes.menuBar}>
            {!isAuthenticated() && (
              <ListItem
                key="Register"
                data-testid="menu-register"
                button
                onClick={() => history.push('/auth')}
              >
                <ListItemText primary="Register" />
              </ListItem>
            )}
            {isAuthenticated() && (
              <ListItem
                key="Logout"
                data-testid="menu-Logout"
                button
                onClick={() => signout(() => history.push('/auth'))}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Toolbar>
      </AppBar>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {props.children}
      </div>
    </div>
  );
};

export default Menu;
