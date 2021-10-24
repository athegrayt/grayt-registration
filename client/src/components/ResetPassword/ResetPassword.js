import React, { useState, useEffect } from 'react';
import { Link as RouterLink, Redirect, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { resetPassword, verifyLink, signout } from '../../auth';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const ResetPassword = () => {
  const classes = useStyles();
  const { id, token } = useParams();
  const [form, setForm] = useState({
    password: '',
    passwordVerify: '',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    verifyLink(id, token);
  }, []);

  const passwordEqual = (password1, password2) => {
    if (password1 !== password2) {
      return 'Passwords do not match.';
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (passwordEqual(form.password, form.passwordVerify)) {
      return setError(passwordEqual(form.password, form.passwordVerify));
    }
    resetPassword(id, form.password)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          signout(() => {
            setRedirect(true);
          });
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const resetPasswordForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={() => handleSubmit()}
          noValidate
        >
          <TextField
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={error && error.includes('password')}
            helperText={
              error &&
              error.includes('password') &&
              (error || `Password is required`)
            }
            margin="normal"
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Enter new password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            value={form.passwordVerify}
            onChange={(e) =>
              setForm({ ...form, passwordVerify: e.target.value })
            }
            error={error && error.includes('match')}
            helperText={error}
            margin="normal"
            variant="outlined"
            required
            fullWidth
            name="passwordVerify"
            label="Re-enter new password"
            type="password"
            id="passwordVerify"
            autoComplete="current-passwordVerify"
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
      {redirect && <Redirect to="/" />}
    </Container>
  );

  return resetPasswordForm()
};

export default ResetPassword;
