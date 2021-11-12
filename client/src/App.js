import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
          <Route path="/" exact render={() => <Home auth={auth} />} />
          <Route path="/auth" component={Auth} />
          <Route path="/account-lookup" component={AccountLookup} />
          <Route path="/reset-password/:id/:token" component={ResetPassword} />
        </Menu>
      </Switch>
    </Router>
  );
};

export default App;
