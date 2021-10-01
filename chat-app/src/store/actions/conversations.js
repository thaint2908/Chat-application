import * as actionTypes from './actionTypes';
import {loaded, loading} from './loading';
import {clearError, createError} from './error';
import {getAllConversations, getConversation} from '../../api/convensations';


export const conversationActive = (id) => {
    return {
        type: actionTypes.CONVERSATION_ACTIVE,
        conversationId: id,
    }
}

export const allConversationsAction = (data) => {
    return {
        type: actionTypes.ALL_CONVERSATION,
        data
    }
}
export const conversationMessage = (data) => {
    return {
        type: actionTypes.CONVERSATION_MESSAGE,
        data
    }
}

export const addMessageAction = (message) => {
    return {
        type: actionTypes.ADD_MESSAGE,
        message,
    }
}


export const getActiveConversation = (id) => {
    return dispatch => {
        dispatch(loading());
        getConversation(id,1)
            .then(data => {
                dispatch(loaded());
                dispatch(conversationActive(id));
            })
            .catch(err => {
                console.log(err);
                dispatch(createError(err));
            })
    }
};
export const  conversationMessageAction = (conversationActiveId, page = 1) =>{
    return dispatch =>{
        dispatch(loading());
        getConversation(conversationActiveId, page)
            .then(res => {
                dispatch(loaded());
                dispatch(conversationMessage(res));
            })
            .catch(err => {
                console.log(err);
                dispatch(createError(err));
            })
    }
}
