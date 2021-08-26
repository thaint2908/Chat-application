import axios from '../axios-server';

const authHeader = (token) => {
    return {
        'Authorization': 'Bearer ' + token
    };
};

export const getAllConversations = async (receiverId,search) => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        let query="";
        if(receiverId){
            query += `?receiverId=${receiverId}`;
        } else if(search){
            query += `?search=${search}`;
        }else {
            query="";
        }
        const res = await axios.get('/conversations' + query, {
            headers: authHeader(token)
        });
        
        return res.data
    } catch (err) {
        const errMsg = err.response.data
        await Promise.reject(new Error(errMsg));
    }
}

export const sendMessage = async (conversationId, content)  => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const url = '/' + conversationId + '/message'
        const params = new URLSearchParams();
        params.append('content', content)
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

export const getConversation = async (conversationId) => {
    try {
        const token = localStorage.getItem('reduxState')
            ? JSON.parse(localStorage.getItem('reduxState')).auth.user.token
            : '';
        const res = await axios.get('/conversations/' + conversationId, {
            headers: authHeader(token)
        });
        return res.data
    } catch (err) {
        const errMsg = err.response.data
        await Promise.reject(new Error(errMsg));
    }
}
