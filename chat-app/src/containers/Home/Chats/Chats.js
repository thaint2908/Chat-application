import React, { useEffect, useState } from 'react';
import './Chats.css'
import HeaderSideBox from '../../../components/HeaderSideBox/HeaderSideBox';
import { getAllConversations } from '../../../api/convensations';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Person from '../../../components/Person/Person';
import { allConversationsAction, conversationActive } from '../../../store/actions/conversations';
import nameOfBoxChat from '../../../util/senderInfo';
import socket from '../../../socket/socket';
import { RECEIVED_MESSAGE } from '../../../socket/socketEvent';
import conversation from '../../../store/reducers/conversation';
import {getContactsAction} from "../../../store/actions/user";
import senderInfo from "../../../util/senderInfo";

const Chats = () => {
    const conversations = useSelector(state => state.conversation.conversations)
    const [newMessage, setNewMessage] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const history = useHistory();
    const isAuth = useSelector(state => state.auth.user.authenticated);
    const err = useSelector(state => state.error);
    const conversationActiveId = useSelector(state => state.conversation.conversationActiveId);
    const [search,setSearch] = useState("");

    useEffect(() => {
        if (isAuth) {
            getAllConversations(null,search)
                .then(data => {
                    dispatch(allConversationsAction(data));
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }, [isAuth,newMessage,search]);
    useEffect(() => {
        if (conversations && conversations.length > 0 && conversationActiveId === '') {
            dispatch(conversationActive(conversations[0]._id));
        }
    }, [conversations, dispatch, conversationActiveId]);
    
    useEffect(() => {
        socket.on(RECEIVED_MESSAGE, data => {
            setNewMessage(data);
        })
    }, []);
    useEffect(() => {
        if (err) {
            console.log(err);
        }
        if (!isAuth) {
            history.push('/login');
        }
    }, [isAuth, err]);
    if (newMessage) {
        for (const conversation of conversations) {
            if (newMessage.conversationId === conversation._id) {
                conversation.messages.push(newMessage);
            }
        }
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    };

    return (
        
        <div className="cs">
            <div className='cs_header'>
                <div style={{display:"flex"}}>
                    <h4 style={{fontSize:"20px",flexGrow:1}}>Chats</h4>
                </div>
                <div className='cs_search'>
                        <span className='cs_span'>
                            <i className="fas fa-search"/>
                        </span>
                    <input placeholder='Search users' type='search' onChange={handleChangeSearch} className='cs_input'/>
                </div>
            </div>
            <div className="ms_recent">
                <h5>Recent</h5>
                <div className="ms_people">
                    {
                        conversations ?
                            conversations.map(conversation => {
                                if (conversation.messages[0]) {
                                    let avatarUrl,status;
                                    const message = conversation.messages[conversation.messages.length - 1];
                                    avatarUrl =  senderInfo(conversation.members,user.userId).avatar;
                                    status =  senderInfo(conversation.members,user.userId).status;
                                    const senders = nameOfBoxChat(conversation.members, user.userId).usernames
                                    return <Person id={conversation._id} senders={senders} message={message} avatarUrl={avatarUrl}
                                                  status={status}  key={conversation._id}/>
                                }
                            }) : null
                    }
                </div>
            </div>
        </div>
    )
}


export default Chats;
