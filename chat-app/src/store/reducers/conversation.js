import * as actionTypes from '../actions/actionTypes';
import { act } from '@testing-library/react';


const initialState = {
    conversationActiveId: '',
    conversations: null,
    conversation: null,
    messages:[],
}

const conversation = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONVERSATION_ACTIVE:
            return {
                ...state,
                messages: [],
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
                messages:[
                    ...state.messages,
                    ...action.data.conversation.messages,

                ],
                conversation: action.data.conversation,
            }
        case actionTypes.ADD_MESSAGE:
            return  {
                ...state,
                messages: [
                    action.message,
                    ...state.messages,
                ],
                conversation: {
                    ...state.conversation,
                    last_message: action.message,
                    messages: [
                        ...state.conversation.messages,
                        action.message
                    ],
                }
            }
            
        default:
            return state;
    }
}
export default conversation;
