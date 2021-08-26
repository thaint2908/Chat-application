import React, {useEffect, useRef} from 'react';
import AddContactModal from '../../components/AddContactModal/AddContactModal';
import SideBar from './SideBar/SideBar';
import Contacts from './Contacts/Contacts';
import BoxChat from './BoxChat/BoxChat';
import UserProfileSidebar from './UserProfileSidebar/UserProfileSidebar';
import { useDispatch, useSelector } from 'react-redux';
import Chats from './Chats/Chats';
import Profile from './Profile/Profile';
import useOutsideAlerter from '../../hook/useOutsideAlerter';
import { closeModal } from '../../store/actions/modal';
import {getContactsAction, getProfileAction} from "../../store/actions/user";
import {getAllConversations} from "../../api/convensations";
import {allConversationsAction} from "../../store/actions/conversations";
import {getProfileApi} from "../../api/user";

const Home = () => {
    const openModal = useSelector(state => state.modal.openModal);
    const activeSidebar = useSelector(state => state.sidebar.activeSidebar)
    const isAuth = useSelector(state => state.auth.user.authenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth) {
            dispatch(getContactsAction());
            dispatch(getProfileAction());
        }
    }, [isAuth])
    const switchComponent = () => {
        switch (activeSidebar) {
            case 'chats':
                return <Chats/>
            case 'profile':
                return <Profile/>
            case 'contacts':
                return <Contacts/>
            default:
                return <Chats/>
        }
    }
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <SideBar/>
            {switchComponent()}
            <BoxChat/>
            {openModal ?
                <AddContactModal/> : null
            }
        </div>
    )
}
export default Home;
