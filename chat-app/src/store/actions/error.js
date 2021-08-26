import * as actionTypes from './actionTypes';

export const createError = (error) => {
    return {
        type: actionTypes.ERROR,
        error
    };
};

export const clearError = () => {
    return {
        type: actionTypes.OK,
    };
};
