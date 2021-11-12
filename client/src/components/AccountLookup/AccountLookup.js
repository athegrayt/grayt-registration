import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { LinearProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../Modal/Modal';
import { accountLookup } from '../../auth';

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
  const [modal, setModal] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    accountLookup(form.email)
      .then((data) => {
        if (data.error) {
          if (Array.isArray(data.error)) {
            setError(data.error);
          } else {
            setError([data.error]);
          }
        } else {
          setModal({
            title: 'Email sent successfully',
            message: 'Please open email and follow the instructions.',
          });
          setTimeout(() => setRedirect(true), 5000);
        }
        setLoading(false);
      })
      .catch(() => {
        setModal({
          title: 'Oops... ',
          message: 'There was a problem sending the email. Please try again',
        });
        setLoading(false);
      });
  };
  const accountLookupForm = () => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5" component="h2">
          Please enter your email below.
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
              error?.filter((err) => err.toLowerCase().includes('email')) &&
              true
            }
            helperText={error?.filter((err) =>
              err.toLowerCase().includes('email')
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
            inputProps={{ 'data-testid': 'email-account-lookup' }}
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
              'Send Email'
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/auth" variant="body2">
                Remember your password?
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
      {redirect && <Redirect to="/auth" />}
    </Container>
  );

  return accountLookupForm();
};

export default AccountLookup;
