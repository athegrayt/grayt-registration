import React from 'react'
import { BrowserRouter as Router ,Switch, Route } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AccountLookup from './user/AccountLookup'
import ResetPassword from './user/ResetPassword'
import Home from './core/Home'



const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/account-lookup" component={AccountLookup}/>
                <Route path="/reset-password/:id/:token" component={ResetPassword}/>
            </Switch>
        </Router>
    )
}

export default Routes