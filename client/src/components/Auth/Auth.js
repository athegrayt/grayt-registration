import React, { useState } from 'react';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

const Auth = () => {
  const [newUser, setNewUser] = useState();
  const authInterface = newUser ? (
    <Signup setNewUser={() => setNewUser(false)} />
  ) : (
    <Signin setNewUser={() => setNewUser(true)} />
  );

  return authInterface;
};

export default Auth;
