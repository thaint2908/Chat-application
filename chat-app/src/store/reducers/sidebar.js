import * as actionTypes from '../actions/actionTypes'


const initialState = {
    activeSidebar: 'chats'
}
export const sidebar = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTIVE_SIDEBAR:
            return {
                activeSidebar: action.active,
            }
        default:
            return state;
    }
}
