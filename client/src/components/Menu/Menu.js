import React, { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import { signout } from '../../auth';
import { isAuthenticated } from '../../auth';

const useStyles = makeStyles((theme) => {
  return {
    menuBar: {
      display: 'flex',
    },
    isActive: {
      color: 'red',
    },
    page: {
      width: '100%',
      background: '#fefefe',
      padding: theme.spacing(3),
      paddingBottom: 0,
      paddingTop: 0,
    },
    toolbar: theme.mixins.toolbar,
  };
});
const Menu = (props) => {
  const history = useHistory();
  let location = useLocation();
  const classes = useStyles();

  return (
    <div>
      <AppBar elevation={0}>
        <Toolbar>
          <List className={classes.menuBar}>
            {!isAuthenticated() && (
                <ListItem
                  key="Register"
                  data-testid="menu-Register"
                  button
                  onClick={() => history.push('/signin')}
                  className={
                    location.pathname === ('/signin' || '/signup') &&
                    classes.isActive
                  }
                >
                  <ListItemText primary="Register" />
                </ListItem>
            )}
            {isAuthenticated() && (
              <ListItem
                key="Logout"
                data-testid="menu-Logout"
                button
                onClick={() => signout(() => history.push('/'))}
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
