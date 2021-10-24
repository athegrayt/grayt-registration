import React, { useState, useEffect, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
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
            <Route path="/" exact component={Home} />
          ) : (
            <>
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/account-lookup" component={AccountLookup} />
              <Route
                path="/reset-password/:id/:token"
                component={ResetPassword}
              />
              <Redirect to="/signin" />
            </>
          )}
        </Menu>
      </Switch>
    </Router>
  );
};

export default App;
