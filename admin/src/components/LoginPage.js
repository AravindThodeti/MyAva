import React from 'react';
import Link from '@material-ui/core/Link';
import { GoogleLoginButton } from "react-social-login-buttons";
import { GOOGLE_AUTH_URL } from '../constants';
import LoginIcon from '@material-ui/icons/VerifiedUser'
import { saveProfile } from '../store/actions/api.action';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import { login } from '../store/actions/api.action';
import { CircularProgress } from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {URL_DASHBOARD} from '../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        alignContent: 'flex-end'
    }
}));


export default function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginLoading = useSelector((state) => state.loginReducer.loading);
    const loginError = useSelector((state) => state.loginReducer.error);
    const profileLoading = useSelector((state) => state.profileReducer.loading);
    const profileError = useSelector((state) => state.profileReducer.error);
    const profile = useSelector((state) => state.profileReducer.profile);
    const [email, setEmail] = React.useState('');
    const [open, setOpen] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    const handleLogin = () => {
        const data = { email, password };
        dispatch(login(data));
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    if (profile) {
        return <Redirect to={URL_DASHBOARD}></Redirect>
    }

    const loginForm =
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" onChange={handleEmailChange} label="Email" value={email} />
            <TextField id="standard-basic" onChange={handlePasswordChange} label="Password" value={password} />
            <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                disabled={loginLoading || profileLoading}
                startIcon={<LoginIcon />}
                onClick={handleLogin}
            >
                Login
            </Button>
        </form>

    if (loginLoading || profileLoading) {
        return (
            <div>
                {loginForm}
                <CircularProgress />
            </div>
        )
    }
    if (loginError || profileError) {
        const snackBar = <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            handleClose={handleClose}
            message={loginError.message || profileError.message} />

        return (
            <div>
                {loginForm}
                {snackBar}
            </div>
        )
    }
    return (
        <div>
            {loginForm}
        </div>
    );
}