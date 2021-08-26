import axios from '../axios-server';
import {createError} from "../store/actions/error";


const authHeader = (token) => {
    return {
        'Authorization': 'Bearer ' + token
    };
};

export const getContactsApi = async (search) => {
    try {
        const query = "?search="+ search;
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const res = await axios.get('/users/contacts' + query, {
            headers: authHeader(token)
        });
        return res.data
    } catch (err) {
        console.log(err);
        const errMsg = err.response.data;
        await Promise.reject(new Error(errMsg));
    }
}

export const postContact = async (data,dispatch) => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const res = await axios.post('/users/add-contact', data, {
            headers: authHeader(token)
        });
        return res.data;
    } catch (err) {
        if (err.response) {
            dispatch(createError(err.response.data.message));
        }
        const errMsg = err.response.data;
        await Promise.reject(new Error(errMsg));
    }
}


export const getProfileApi = async () => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const res = await axios.get('/users/profile', {
            headers: authHeader(token)
        });
        return res.data;
    } catch (err) {
        const errMsg = err.response.data;
        await Promise.reject(new Error(errMsg));
    }
}

export  const editProfileApi = async (data) =>{
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const res = await axios.put('/users/edit-profile', data,{
            headers: authHeader(token)
        });
        return res.data;
    } catch (err) {
        const errMsg = err.response.data;
        await Promise.reject(new Error(errMsg));
    }
}
export const editAvatarApi = async (data) =>{
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const res = await axios.put('/users/edit-avatar', data,{
            headers: authHeader(token),
            'Content-Type': 'multipart/form-data',
        });
        return res.data;
    } catch (err) {
        const errMsg = err.response.data;
        await Promise.reject(new Error(errMsg));
    }
}