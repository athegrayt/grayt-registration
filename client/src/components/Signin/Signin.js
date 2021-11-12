import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../Modal/Modal';
import { signin, authenticate } from '../../auth';

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
  progress: {
    width: '40%',
    margin: theme.spacing(2),
  },
}));

const Signin = ({ setNewUser }) => {
  const classes = useStyles();
  const [form, setForm] = useState({
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
    signin(form)
      .then((data) => {
        if (data.error) {
          if (Array.isArray(data.error)) {
            setError(data.error);
          } else {
            setError([`${data.error}`]);
          }
        } else {
          authenticate(data, () => {
            setRedirect(true);
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setModal({
          title: 'Oops... ',
          message: 'There was a problem signing you in. Please try again',
        });
        setLoading(false);
      });
  };
  const signinForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <TextField
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={
              error?.filter(
                (err) =>
                  err.toLowerCase().includes('email') &&
                  !err.toLowerCase().includes('password')
              ).length > 0 && true
            }
            helperText={error?.filter(
              (err) =>
                err.toLowerCase().includes('email') &&
                !err.toLowerCase().includes('password')
            )}
            margin="normal"
            required
            variant="outlined"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputProps={{ 'data-testid': 'email-signin' }}
          />
          <TextField
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={
              error?.filter((err) => err.toLowerCase().includes('password'))
                .length > 0 && true
            }
            helperText={
              error?.filter((err) => err.toLowerCase().includes('password'))[0]
            }
            margin="normal"
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{ 'data-testid': 'password-signin' }}
          />
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <div className={classes.progress}>
                <LinearProgress />
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/account-lookup" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={RouterLink}
                onClick={() => setNewUser()}
                variant="body2"
                to="#"
              >
                {"Don't have an account? Sign Up"}
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

  return signinForm();
};

export default Signin;
