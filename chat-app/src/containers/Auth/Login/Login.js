import React, { Component, useState, useEffect } from 'react';
import './Login.css'
import * as types from '../../../store/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { loginAuth } from '../../../store/actions/auth';
import { checkEmail, checkEmpty, checkPassword } from '../../../util/checkFields';
import { useHistory } from 'react-router';
import socket from '../../../socket/socket'
import { io } from 'socket.io-client';
import { JOIN } from '../../../socket/socketEvent';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuth = useSelector(state => state.auth.user.authenticated);
    const userId = useSelector(state => state.auth.user.userId)
    const err = useSelector(state => state.error);
    
    const [fields, setFields] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });
    
    
    const handleInputChange = (e) => {
        setFields(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    };
    const handleBlur = (e) => {
        switch (e.target.name) {
            case 'email':
                return setErrors(prev => {
                    return {
                        ...prev,
                        email: checkEmail(e.target.value)
                    }
                })
            case 'password':
                return setErrors(prev => {
                    return {
                        ...prev,
                        password: checkPassword(e.target.value)
                    }
                })
            default :
                return setErrors(prev => {
                    return {
                        ...prev,
                        [e.target.name]: checkEmpty(e.target.value)
                    }
                })
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({
            email: checkEmail(fields.email),
            password: checkPassword(fields.password),
        })
        for (const field in fields) {
            if (checkEmpty(fields[field])) {
                return 1;
            }
        }
        dispatch(loginAuth(fields.email, fields.password));
        
    }
    useEffect(() => {
        if (err) {
            console.log(err);
        }
        
        if (isAuth) {
            history.push('/');
        }
    }, [isAuth, err]);
    
    return (
        <div className="root">
            <div className="account-pages my-5 pt-sm-5">
                <div className="container">
                    <div className="justify-content-center row">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="text-center mb-4">
                                <h4>Sign In</h4>
                                <p className="text-muted mb-4">Sign in to continue to Chatvia.</p>
                            </div>
                            <div className="card">
                                <div className="p-4 card-body">
                                    <div className="p-3">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Username</label>
                                                <div className="mb-3 bg-soft-light rounded-3 input-group">
                                                        <span className="input-group-text text-muted" id="basic-addon3">
                                                            <i className="fas fa-user"/>
                                                        </span>
                                                    <input id="email"
                                                           name="email"
                                                           placeholder="Enter email"
                                                           type="text"
                                                           onBlur={handleBlur}
                                                           onChange={handleInputChange}
                                                           className="form-control form-control-lg border-light bg-soft-light form-control"
                                                           aria-invalid="false"
                                                    />
                                                    {errors.email &&
                                                    <div className="error">
                                                        <span>
                                                            {errors.email}
                                                        </span>
                                                    </div>}
                                                </div>
                                            </div>
                                            <div className="mb-4 form-group">
                                                <div className="float-end"><a className="text-muted font-size-13"
                                                                              href="/forget-password">Forgot
                                                    password?</a></div>
                                                <label className="form-label">Password</label>
                                                <div className="mb-3 bg-soft-light rounded-3 input-group"><span
                                                    className="input-group-text text-muted">
                                                        <i className="fas fa-lock"/>
                                                    </span>
                                                    <input id="password"
                                                           name="password"
                                                           placeholder="Enter Password"
                                                           onBlur={handleBlur}
                                                           onChange={handleInputChange}
                                                           type="password"
                                                           className="form-control form-control-lg border-light bg-soft-light form-control"
                                                           aria-invalid="false"
                                                    />
                                                    {errors.password &&
                                                    <div className="error">
                                                        <span>
                                                            {errors.password}
                                                        </span>
                                                    </div>}
                                                </div>
                                            </div>
                                            {err &&
                                            <div className="auth_error">
                                                        <span>
                                                            {err}
                                                        </span>
                                            </div>}
                                            <div className="d-grid">
                                                <button type="submit"
                                                        className=" waves-effect waves-light btn btn-primary btn-block">Sign
                                                    in
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-center"><p>Don't have an account ? <a
                                className="font-weight-medium text-primary" href="/signup"> Signup now </a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
