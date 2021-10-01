import React, {useEffect, useState} from 'react';
import './SignUp.css';
import {checkEmail,checkEmpty,checkPassword} from '../../../util/checkFields'
import {useDispatch, useSelector} from "react-redux";
import {signUp, signUpAuth} from "../../../store/actions/auth";
import {useHistory} from "react-router";


const SignUp = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const err = useSelector(state => state.error);
    const isAuth = useSelector(state => state.auth.user.authenticated);
    const [fields, setFields] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [errors, setErrors] = useState({});

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
            case "email":
                return setErrors(prev => {
                    return {
                        ...prev,
                        email: checkEmail(e.target.value)
                    }
                })
            case "password":
                return setErrors(prev => {
                    return {
                        ...prev,
                        password:checkPassword(e.target.value)
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
    useEffect(() => {
        if (err) {
            console.log(err);
        }

        if (isAuth) {
            history.push('/');
        }
    }, [isAuth, err]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({
            email: checkEmail(fields.email),
            name: checkEmpty(fields.name),
            password: checkPassword(fields.password),
        })
        for (const field in fields) {
            if (checkEmpty(fields[field])) {
                return 1;
            }
        }
        dispatch(signUpAuth(fields.email,fields.name,fields.password,() =>{
            history.push("/login");
        }));
    }
    return (
        <div id="root">
            <div className="account-pages my-5 pt-sm-5">
                <div className="container">
                    <div className="justify-content-center row">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="text-center mb-4">
                                <h4>Sign up</h4>
                                <p className="text-muted mb-4">Get a new account</p>
                            </div>
                            <div className="card">
                                <div className="p-4 card-body">
                                    <div className="p-3">
                                        <form className="" onSubmit={handleSubmit}>
                                            <div className="mb-3"><label className="form-label">Email</label>
                                                <div className="input-group bg-soft-light rounded-3 mb-3 input-group">
                                                    <span className="input-group-text text-muted">
                                                        <i className="fas fa-envelope"/>
                                                    </span>
                                                    <input id="email"
                                                           name="email"
                                                           placeholder="Enter Email"
                                                           onChange={handleInputChange}
                                                           type="text"
                                                           onBlur={handleBlur}
                                                           value={fields.email}
                                                           className="form-control form-control-lg bg-soft-light border-light form-control"
                                                           aria-invalid="false"/>
                                                    {errors.email &&
                                                    <div className="error">
                                                        <span>
                                                            {errors.email}
                                                        </span>
                                                    </div> }
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <div
                                                    className="mb-3 bg-soft-light input-group-lg rounded-lg input-group">
                                                        <span className="input-group-text border-light text-muted">
                                                            <i className="fas fa-user"/>
                                                        </span>
                                                    <input id="name"
                                                           name="name"
                                                           placeholder="Enter your name"
                                                           type="text"
                                                           value={fields.name}
                                                           onBlur={handleBlur}
                                                           onChange={handleInputChange}
                                                           className="form-control form-control-lg bg-soft-light border-light form-control"
                                                           aria-invalid="false"/>
                                                    {errors.name &&
                                                    (<div className="error">
                                                        <span>
                                                            {errors.name}
                                                        </span>
                                                    </div>)}
                                                </div>
                                            </div>
                                            <div className="mb-4 form-group"><label
                                                className="form-label">Password</label>
                                                <div
                                                    className="mb-3 bg-soft-light input-group-lg rounded-lg input-group">
                                                        <span className="input-group-text border-light text-muted">
                                                            <i className="fas fa-lock"/>
                                                        </span>
                                                    <input id="password"
                                                           name="password"
                                                           placeholder="Enter Password"
                                                           onBlur={handleBlur}
                                                           onChange={handleInputChange}
                                                           type="password"
                                                           className="form-control form-control-lg bg-soft-light border-light form-control"
                                                           aria-invalid="false"/>
                                                    {errors.password &&
                                                    (<div className="error">
                                                        <span>
                                                            {errors.password}
                                                        </span>
                                                    </div>)}
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
                                                    up
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-center">
                                <p>Already have an account ?
                                    <a className="font-weight-medium text-primary" href="/login"> Login </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUp;





