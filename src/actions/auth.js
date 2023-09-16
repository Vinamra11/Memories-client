import * as api from '../api';
import decode from 'jwt-decode';

import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        const token = data?.token;
        const decodedToken = decode(token);
        const exp = decodedToken?.exp * 1000;
        const profile = { name: data?.profile?.name, email: data?.profile?.email, imageUrl: data?.profile?.picture, _id: data?.profile?._id, exp };
        dispatch({ type: AUTH, payload: { token, profile, authType: "Primary" } });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        const token = data?.token;
        const decodedToken = decode(token);
        const exp = decodedToken?.exp * 1000;
        const profile = { name: data?.profile?.name, email: data?.profile?.email, imageUrl: data?.profile?.picture, _id: data?.profile?._id, exp };
        dispatch({ type: AUTH, payload: { token, profile, authType: "Primary" } });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
};