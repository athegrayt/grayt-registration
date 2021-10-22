import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { accountLookup} from '../auth';
import { LinearProgress} from '@material-ui/core';
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

const AccountLookup = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    accountLookup(form.email)
      .then((data) => {
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
  const accountLookupForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={() => handleSubmit()}
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
            autoFocus
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
              'Reset Password'
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/signin" variant="body2">
                Remember your password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return (
    <Layout
      title="Let's find your account!"
      description="Enter your account email and we will send you a link to reset your password!"
    >
      {accountLookupForm()}
      {redirect && <Redirect to="/" />}
    </Layout>
  );
};

export default AccountLookup;
