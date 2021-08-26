import * as actionTypes from './actionTypes';

export const loading = () => {
    return {
        type: actionTypes.LOADING
    };
};

export const loaded = () => {
    return {
        type: actionTypes.LOADED
    };
};
