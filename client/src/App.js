import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import AccountLookup from './components/AccountLookup/AccountLookup';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';

const App = () => (
  <Router>
    <Switch>
      <Menu>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/account-lookup" component={AccountLookup} />
        <Route path="/reset-password/:id/:token" component={ResetPassword} />
      </Menu>
    </Switch>
  </Router>
);

export default App;
