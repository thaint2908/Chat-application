import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
}

export const loading = (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING:
            return true;
        case types.LOADED:
            return false;
        default:
            return state;
    }
};
