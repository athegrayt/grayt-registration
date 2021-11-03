import React, { useState, useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import Auth from './components/Auth/Auth';
import AccountLookup from './components/AccountLookup/AccountLookup';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import { isAuthenticated } from './auth';

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Menu>
          {auth ? (
            <Fragment>
              <Route path="/" exact component={Home} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="/auth" component={Auth} />
              <Route path="/account-lookup" component={AccountLookup} />
              <Route
                path="/reset-password/:id/auth/:token"
                component={ResetPassword}
              />
              {/* <Redirect to="/auth" /> */}
            </Fragment>
          )}
        </Menu>
      </Switch>
    </Router>
  );
};

export default App;
