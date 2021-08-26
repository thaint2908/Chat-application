import * as actionTypes from '../actions/actionTypes';
import {act} from "@testing-library/react";


const initialState = {
    email: null,
    name: null,
    avatarUrl: null,
    birthday:null,
    phoneNumber:null,
    status: null,
    contacts: [],
}

const getContactsReducer = (state, action) => {
    return {
        ...state,
        contacts: action.contacts,
    }
}
const addContactReducer = (state, action) => {
    return {
        ...state,
        contacts: [
            ...state.contacts,
            action.contact,
        ]
    }
}
const editAvatarReducer = (state,action) =>{
    return{
        ...state,
        avatarUrl: action.avatarUrl,
    }
}
const editProfileReducer = (state,action) =>{
    return{
        ...state,
        name:action.name,
        birthday: action.birthday,
        phoneNumber: action.phoneNumber,

    }
}
const getProfileReducer = (state,action) =>{
    return{
        ...state,
        name: action.data.name,
        avatarUrl: action.data.avatar,
        email:action.data.email,
        birthday: action.data.birthday,
        phoneNumber: action.data.phoneNumber,
        status:true,
    }
}
export const user = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALL_CONTACTS:
            return getContactsReducer(state, action)
        case actionTypes.ADD_CONTACT:
            return addContactReducer(state, action)
        case actionTypes.PROFILE:
            return getProfileReducer(state,action)
        case actionTypes.EDIT_PROFILE:
            return editProfileReducer(state,action)
        case actionTypes.EDIT_AVATAR:
            return editAvatarReducer(state,action)
        default:
            return state;
    }
}
export default user;
