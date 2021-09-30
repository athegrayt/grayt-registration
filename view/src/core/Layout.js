import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core'
import Menu from './Menu'

const useStyles = makeStyles(theme => {
    return {
        paper: {
            padding: theme.spacing(3),
            backgroundColor: "lightGray",
            marginBottom: theme.spacing(2)
        }
    }
})

const Layout = ({
    title= "Title", description = "Description", children
}) => {
 const classes = useStyles()   
    return (
        <div>
            <Menu />
            <Paper className={classes.paper} elevation={0}>
                <Typography variant="h5" component='h2'>{title}</Typography>
                <Typography>{description}</Typography>
            </Paper>
        {children}
    </div>
)}

export default Layout