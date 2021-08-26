import * as actionTypes from '../actions/actionTypes';

const initialState = null;
export const error = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ERROR: {
            return action.error;
        }
        case actionTypes.OK:
            return null;
        default:
            return state;
    }
};
