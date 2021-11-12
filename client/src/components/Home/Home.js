import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

const Home = ({ auth }) => {
  const [modal, setModal] = useState({
    title: '',
    message: '',
  });

  useEffect(() => {
    if (auth) {
      setModal({
        title: 'Congratulations',
        message: 'You have been successful signed in!',
      });
    } else {
      setModal({
        title: 'Please signin',
        message: 'Click "Register" in the menu to signin!',
      });
    }
  }, [auth]);
  return (
    <Modal
      title={modal.title}
      message={modal.message}
      modal={modal && true}
      setModal={() => setModal(!modal)}
    />
  );
};

export default Home;
