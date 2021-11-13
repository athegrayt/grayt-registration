import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [homePage, setHomePage] = useState({
    title: '',
    message: '',
  });

  useEffect(() => {
    if (isAuthenticated()) {
      setHomePage({
        title: 'Welcome to the home page!',
        message: 'Congratulations, you have been successfully signed in!',
      });
    } else {
      setHomePage({
        title: 'Welcome to the home page!',
        message: 'Click "Register" in the menu above to register.',
      });
    }
  }, []);
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {homePage.title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {homePage.message}
      </Typography>
    </Box>
  );
};

export default Home;
