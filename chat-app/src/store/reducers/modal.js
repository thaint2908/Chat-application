import * as actionTypes from "../actions/actionTypes"
import {openModal} from "../actions/modal";

const initialState = {
    openModal: false
}

export const modal = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return {
                openModal: true,
            }
        case actionTypes.CLOSE_MODAL:
            return {
                openModal: false,
            }
        default:
            return state;
    }
}
