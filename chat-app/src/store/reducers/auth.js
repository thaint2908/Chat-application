import Cookies from 'js-cookie'
import * as types from '../actions/actionTypes';


const initialState = {
    user: {
        authenticated: false,
        email: null,
        token: null,
        expiresIn: null,
    }
}

const signUp = (state, action) => {
    return {
        ...state,
        error: false,
        payload: action.data
    }
}

const login = (state, action) => { // nó sẽ chạy vào đây và cái state này n sẽ lưu vào local
    const {userId, email, token, expiresIn} = action;
    const user = {
        authenticated: true,
        userId,
        email,
        token,
        expiresIn
    }
    Cookies.set('token', token, {
        expires: expiresIn * 1000
    });
    
    return {
        ...state,
        user: user,
    };
};
const logout = (state, action) => {
    Cookies.remove('token');
    return initialState;
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_UP:
            return signUp(state, action);
        case types.LOGIN:
            return login(state, action);
        case types.LOGOUT:
            return logout(state, action);
        default:
            return state;
    }
};

export default auth;
