import React, { useState } from 'react';
import { Avatar, Button, Paper, Typography, Container, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginSocialGoogle } from 'reactjs-social-login';

import Input from './Input';
import { AUTH } from '../../constants/actionTypes';
import Icon from './Icon';
import { signin, signup } from '../../actions/auth';

import useStyles from './styles';

function Auth() {

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };



    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => setIsSignup((prevIsSignup) => !prevIsSignup);

    //GoogleLogin
    const handleResolve = async ({ provider, data }) => {

        // console.log(data, "From auth google hamdle resolve");
        const token = data?.access_token;
        const expires_in = data?.expires_in;
        const exp = Date.now() + (expires_in * 1000);

        try {
            const profile = { name: data?.name, email: data?.email, imageUrl: data?.picture, _id: data?.sub, exp };
            // console.log(profile);
            dispatch({ type: AUTH, payload: { token, profile, authType: "Google" } });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };

    const handleReject = (error) => console.log(error);

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}

                        <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? "Sign Up" : "Sign In"}</Button>

                        <LoginSocialGoogle
                            client_id='491859238738-qqqma14ap6bnjj3irjjdp8vvfoc3da2s.apps.googleusercontent.com'
                            scope='openid profile email'
                            discoveryDocs='claims_supported'
                            access_type='offline'
                            onResolve={handleResolve}
                            onReject={handleReject}
                            className={classes.googleButton}
                        >
                            {/* <GoogleLoginButton /> */}
                            <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit} startIcon={<Icon />}>Google Sign In</Button>
                        </LoginSocialGoogle>

                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>{isSignup ? "Already have an Account? Sign In" : "Don't have an Account? Sign Up"}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
