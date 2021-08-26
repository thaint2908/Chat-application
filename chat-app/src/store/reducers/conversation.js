import * as actionTypes from '../actions/actionTypes';
import { act } from '@testing-library/react';


const initialState = {
    conversationActiveId: '',
    conversations: null,
    conversation: null,
}

const conversation = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONVERSATION_ACTIVE:
            return {
                ...state,
                conversationActiveId: action.conversationId,
            }
        case actionTypes.CONVERSATION_DELETE:
            return {
                ...state,
                conversationActiveId: '',
            }
        case actionTypes.ALL_CONVERSATION:
            return {
                ...state,
                conversations: action.data
            }
        case actionTypes.CONVERSATION_MESSAGE:
            return {
                ...state,
                conversation: action.data
            }
        case actionTypes.ADD_MESSAGE:
            return  {
                ...state,
                conversation: {
                    ...state.conversation,
                    last_message: action.message,
                    messages: [
                        action.message,
                        ...state.conversation.messages,
                    ],
                }
            }
            
        default:
            return state;
    }
}
export default conversation;
