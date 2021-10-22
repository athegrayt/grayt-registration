import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { signin } from '../auth';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authenticate } from '../auth';

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

const Signin = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    console.log(form)
    signin(form)
      .then((data) => {
        console.log(data)
        if (data.error) {
          setError(data.error);
        } else {
          authenticate(data, () => {
            setRedirect(true);
          });
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const signinForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <TextField
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={error && error.includes('email')}
            helperText={
              error &&
              error.includes('email') &&
              (error || `Valid email is required`)
            }
            margin="normal"
            required
            variant="outlined"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            //value="jerrySpringer@gmail.com"
            autoFocus
          />
          <TextField
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={(error && error.includes('password'))}
            helperText={
              ((error && error.includes('password')) &&
              (error || `Password is required`))
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
            // value="zxcvbnm123"
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
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return (
    <Layout
      title="Signin"
      description="Signin to the Node React E-commerce App"
    >
      {signinForm()}
      {redirect && <Redirect to="/" />}
    </Layout>
  );
};

export default Signin;
