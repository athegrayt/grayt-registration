import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Avatar, LinearProgress, Typography } from '@material-ui/core';
import { signup } from '../../auth';
import Modal from '../Modal/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 0, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitContainer: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  progress: {
    width: '40%',
    margin: theme.spacing(2),
  },
}));

const Signup = ({ setNewUser }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [modal, setModal] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signup(form)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setForm({ firstName: '', lastName: '', email: '', password: '' });
          setError(null);
          setRedirect(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setModal({
          title: 'Oops... ',
          message: 'There was a problem signing you up. Please try again',
        });
        setLoading(false);
      });
  };

  const signUpForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                error={
                  error?.filter((err) => err.toLowerCase().includes('first'))
                    .length > 0 && true
                }
                helperText={error?.filter((err) =>
                  err.toLowerCase().includes('first')
                )}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputProps={{ 'data-testid': 'firstName-signup' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                error={
                  error?.filter((err) => err.toLowerCase().includes('last'))
                    .length > 0 && true
                }
                helperText={error?.filter((err) =>
                  err.toLowerCase().includes('last')
                )}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputProps={{ 'data-testid': 'lastName-signup' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={
                  error?.filter((err) => err.toLowerCase().includes('email'))
                    .length > 0 && true
                }
                helperText={error?.filter((err) =>
                  err.toLowerCase().includes('email')
                )}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputProps={{ 'data-testid': 'email-signup' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={
                  error?.filter((err) => err.toLowerCase().includes('password'))
                    .length > 0 && true
                }
                helperText={
                  error?.filter((err) =>
                    err.toLowerCase().includes('password')
                  )[0]
                }
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputProps={{ 'data-testid': 'password-signup' }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            {loading ? (
              <div className={classes.progress}>
                <LinearProgress />
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                onClick={() => setNewUser()}
                to="#"
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {modal && (
        <Modal
          title={modal.title}
          message={modal.message}
          modal={modal && true}
          setModal={() => setModal(!modal)}
        />
      )}
      {redirect && <Redirect to="/" />}
    </Container>
  );
  return signUpForm();
};

export default Signup;
