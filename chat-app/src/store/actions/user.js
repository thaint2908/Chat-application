import * as actionTypes from './actionTypes';
import {loaded, loading} from './loading';
import {clearError, createError} from './error';
import {getContactsApi, getProfileApi, editProfileApi, editAvatarApi} from "../../api/user";

export const getContacts = (contacts) => {
    return {
        type: actionTypes.ALL_CONTACTS,
        contacts
    }
}

export const addContact = (contact) => {
    return {
        type: actionTypes.ADD_CONTACT,
        contact
    }
}
export const getProfile = (data) => {
    return {
        type: actionTypes.PROFILE,
        data,
    }
}
export const editProfile = (name, phoneNumber, birthday) => {
    return {
        type: actionTypes.EDIT_PROFILE,
        name,
        phoneNumber,
        birthday,
    }
}
export const editAvatar = (avatarUrl) => {
    console.log(avatarUrl);
    return {
        type: actionTypes.EDIT_AVATAR,
        avatarUrl
    }
}
export const getContactsAction = (search) => {
    return dispatch => {
        dispatch(loading());
        getContactsApi(search)
            .then(res => {
                dispatch(getContacts(res));
                dispatch(loaded());
            })
            .catch(err => {
                if (err.response) {
                    dispatch(createError(err.response.data.message));
                }
            });
    }
}
export const getProfileAction = () => {
    return dispatch => {
        dispatch(loading());
        getProfileApi()
            .then(res => {
                dispatch(getProfile(res));
                console.log(res);
                dispatch(loaded());
            })
            .catch(err => {
                if (err.response) {
                    dispatch(createError(err.response.data.message));
                }
            });
    }
}

export const editProfileAction = (name, phoneNumber, birthday) => {

    return dispatch => {
        dispatch(loading());
        const params = new URLSearchParams();
        params.append("name", name);
        params.append("phoneNumber", phoneNumber);
        params.append("birthday", birthday);
        editProfileApi(params)
            .then(res => {
                console.log(res);
                console.log(res.birthday);
                dispatch(editProfile(res.name, res.phoneNumber, res.birthday))
                dispatch(loaded());
            })
            .catch(err => {
                if (err.response) {
                    dispatch(createError(err.response.data.message));
                }
            })
    }
}

export const editAvatarAction = (avatar) => {
    return dispatch => {
        dispatch(loading());
        const formData = new FormData();
        formData.append("avatar", avatar);
        editAvatarApi(formData)
            .then(res => {
                console.log(res);
                dispatch(editAvatar(res.avatar));
                dispatch(loaded());
            })
            .catch(err => {
                if (err.response) {
                    dispatch(createError(err.response.data.message));
                }
            })
    }
}