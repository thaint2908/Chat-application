import axios from '../../axios-server';
import * as actionTypes from './actionTypes';
import jwtDecode from 'jwt-decode';
import { loaded, loading } from './loading';
import { clearError, createError } from './error';

export const login = (userId, email, expiresIn, token) => {
    return {
        type: actionTypes.LOGIN,
        userId,
        email,
        expiresIn,
        token,
    };
};

export const signUp = (email, name, password) => {
    return {
        type: actionTypes.SIGN_UP,
        email,
        name,
        password,
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    };
};

export const loginAuth = (email, password) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password)
    
    return dispatch => {
        axios.post('/auth/login', params)
            .then(res => {
                dispatch(loading());
                dispatch(clearError());
                const jwtData = jwtDecode(res.data.token);
                const userId = jwtData.userId;
                const email = jwtData.email;
                const expiresIn = jwtData.exp;
                const token = res.data.token;
                dispatch(login(userId, email, expiresIn, token));
                dispatch(loaded());
            })
            .catch(err => {
                if (err.response) {
                    dispatch(createError(err.response.data.message));
                }
            });
    }
}
export const signUpAuth = (email, name, password, cb) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('name', name);
    params.append('password', password);
    return dispatch => {
        axios.post('/auth/signup', params)
            .then(response => {
                dispatch(loading());
                dispatch(clearError());
                dispatch(loaded());
                cb();
            })
            .catch(err => {
                if (err.response) {
                    dispatch(createError(err.response.data.message));
                }
            });
    };
};

export const logoutAuth = () => {
    return dispatch => {
        dispatch(clearError());
        dispatch(logout());
    };
};
