import * as actionTypes from './actionTypes';

export const activeSidebar = (active) => {
    return {
        type: actionTypes.ACTIVE_SIDEBAR,
        active
    }
}

