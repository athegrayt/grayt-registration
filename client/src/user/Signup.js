import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signup } from '../auth';
import { LinearProgress } from '@material-ui/core';

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

const Signup = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    signup(form)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log(data);
          setForm({ firstName: '', lastName: '', email: '', password: '' });
          setError(null);
          setRedirect(true);
        }
        setLoading(false);
      })
      .catch();
  };

  const signUpForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
                error={error && error.includes('First')}
                helperText={
                  error &&
                  error.includes('First') &&
                  (error || `First name is required`)
                }
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                error={error && error.includes('Last')}
                helperText={
                  error &&
                  error.includes('Last') &&
                  (error || `Last name is required`)
                }
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={error && error.includes('email')}
                helperText={
                  error &&
                  error.includes('email') &&
                  (error || `Valid email is required`)
                }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={error && error.includes('password')}
                helperText={
                  ((error && error.includes('Password'))) &&
                  (error || `Password is required`)
                }
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <Link component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return (
    <Layout
      title="Signup"
      description="Signup for the Node React E-commerce App"
    >
      {signUpForm()}
      {redirect && <Redirect to="/" />}
    </Layout>
  );
};

export default Signup;
