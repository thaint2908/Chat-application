import axios from '../axios-server';
import conversation from "../store/reducers/conversation";

const authHeader = (token) => {
    return {
        'Authorization': 'Bearer ' + token
    };
};

export const getAllConversations = async (receiverId, search) => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const res = await axios.get('/conversations', {
            params: {
                receiverId: receiverId,
                search: search,
            },
            headers: authHeader(token)
        });

        return res.data
    } catch (err) {
        const errMsg = err.response.data
        await Promise.reject(new Error(errMsg));
    }
}

export const sendMessage = async (conversationId, data) => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const url = '/' + conversationId + '/message'
        const params = new URLSearchParams();
        params.append('content', data)
        const res = await axios.post(url, params, {
            headers: {
                ...authHeader(token),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        return res.data
    } catch (err) {
        const errMsg = err.response.data
        await Promise.reject(new Error((errMsg)));
    }
}

export const getConversation = async (conversationId,page) => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';

        const res = await axios.get('/conversations/' + conversationId, {
            params:{
                page:page
            },
            headers: authHeader(token)
        });
        return res.data
    } catch (err) {
        const errMsg = err.response.data
        await Promise.reject(new Error(errMsg));
    }
}

export const sendImageMessage = async (conversationId,data) => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const url = '/' + conversationId + '/message';
        const formData = new FormData();
        for (const image of data) {
            formData.append('content',image);
        }
        const res = await axios.post(url, formData, {
            headers: {
                ...authHeader(token),
                'Content-Type': 'multipart/form-data',
            }
        })
        return res.data
    } catch (err) {
        const errMsg = err.response.data
        await Promise.reject(new Error(errMsg));
    }
}
