import React, { useState } from 'react';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';

const Auth = ({ setModal }) => {
  const [newUser, setNewUser] = useState();
  const authInterface = newUser ? (
    <Signup
      setModal={(msg) => setModal(msg)}
      setNewUser={() => setNewUser(false)}
    />
  ) : (
    <Signin
      setModal={(msg) => setModal(msg)}
      setNewUser={() => setNewUser(true)}
    />
  );

  return authInterface;
};

export default Auth;
