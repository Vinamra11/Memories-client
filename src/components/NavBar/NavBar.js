import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { LOGOUT } from '../../constants/actionTypes';

import useStyles from './styles';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';


function NavBar() {

    const getProfile = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [user, setUser] = useState(getProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user?.token && user?.profile.exp < Date.now()) handleLogout(); // check for expire token

        setUser(getProfile);
    }, [location]);

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        navigate("/"); // TO DO: dosen't refresh the page
        setUser(null);
    };

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} alt='memoriesText' height='45' />
                <img className={classes.image} src={memoriesLogo} alt='memoriesLogo' height='40' />

            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.profile.name} src={user?.profile.imageUrl}>{user?.profile.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user?.profile.name}</Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default NavBar;
