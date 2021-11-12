import React, { useState } from 'react';
import { Link as RouterLink, Redirect, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../Modal/Modal';
import { resetPassword } from '../../auth';

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
  const [modal, setModal] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetPassword(id, token, form.password, form.passwordVerify)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          setModal({
            title: 'Password was updated successfully',
            message: 'Please sign in with you new password.',
          });
          setTimeout(() => {
            setRedirect(true);
          }, 5000);
          setLoading(false);
        }
      })
      .catch(() => {
        setModal({
          title: 'Oops... ',
          message:
            'There was a problem resetting your password. Please try again',
        });
        setLoading(false);
      });
    return null;
  };
  const resetPasswordForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5" component="h2">
          Please enter your new password below.
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <TextField
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={
              error?.filter((err) => err.toLowerCase().includes('password')) &&
              true
            }
            helperText={
              error?.filter((err) => err.toLowerCase().includes('password'))[0]
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
            inputProps={{ 'data-testid': 'password-resetPassword' }}
          />
          <TextField
            value={form.passwordVerify}
            onChange={(e) =>
              setForm({ ...form, passwordVerify: e.target.value })
            }
            error={error?.filter((err) => err.includes('match')) && true}
            helperText={error?.filter((err) => err.includes('match'))}
            margin="normal"
            variant="outlined"
            required
            fullWidth
            name="passwordVerify"
            label="Re-enter new password"
            type="password"
            id="passwordVerify"
            autoComplete="current-passwordVerify"
            inputProps={{ 'data-testid': 'passwordVerify-resetPassword' }}
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

  return resetPasswordForm();
};

export default ResetPassword;
