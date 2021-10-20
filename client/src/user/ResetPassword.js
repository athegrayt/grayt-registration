import React, { useState, useEffect } from 'react'
import {Link as RouterLink, Redirect, useParams } from 'react-router-dom';
import Layout from '../core/Layout'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'
import {resetPassword, verifyLink, authenticate, signout} from '../auth'
import { LinearProgress, Typography } from '@material-ui/core';
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
  }
}));

const ResetPassword = () => {
    
    const classes = useStyles();
    const {id, token} = useParams()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        verifyLink(id, token)
    },[])

    const clickSubmit = (data) => {
        const { password } = data
        setLoading(true)
        resetPassword(id,password)
            .then(data => {
                if (data.error) {
                setError(data.error)
                } else {
                    signout(() => {
                        setRedirect(true)    
                        })
                    }
            setLoading(false)
        })
        .catch(err=>console.log(err))
    }
    const resetPasswordForm = () => (
    
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit(data=>clickSubmit(data))} noValidate>
                    <TextField
                        {...register("password", {required: true})}
                        error={(error && error.includes("password")) || errors.password}
                        helperText={((error && error.includes("password")) || errors.password) && (error || `Password is required`)}
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Enter new password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        // value="zxcvbnm123"
                    />
                    <TextField
                        {...register("passwordVerify", {
                            required: true,
                            validate: {passwordEqual: value => (value === getValues().password) || 'password confirmation error!'}
                        })}
                        error={errors.passwordVerify}
                        helperText={errors.passwordVerify &&  `Passwords do not match.`}
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        name="passwordVerify"
                        label="Re-enter new password"
                        type="password"
                        id="passwordVerify"
                        autoComplete="current-passwordVerify"
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
                    {loading ? (<div className={classes.progress}><LinearProgress/></div>): 'Sign In'}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/account-lookup"variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink}to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
   
    )

    return (
        <Layout title="Reset Password"
            description="Please enter your new password and click submit.">
            {resetPasswordForm()}
            {redirect && <Redirect to='/'/>}
        </Layout>
    )
}

export default ResetPassword;