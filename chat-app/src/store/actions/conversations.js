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
export const conversationMessageAction = (data) => {
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
        getConversation(id)
            .then(data => {
                dispatch(loaded());
                dispatch(conversationActive(data._id));
            })
            .catch(err => {
                console.log(err);
                dispatch(createError(err));
            })
    }
};


export const receiverMessageAction = (data) => {

}
