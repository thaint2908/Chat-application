import React, {useEffect, useRef, useState} from 'react';
import './BoxChat.css';
import {useDispatch, useSelector} from "react-redux";
import {getAllConversations, getConversation, sendMessage} from "../../../api/convensations";
import senderInfo from "../../../util/senderInfo";
import {useHistory} from "react-router";
import Avatar from "../../../components/Avatar/Avatar";
import TextMessage from "../../../components/Message/TextMessage/TextMessage";
import useOutsideAlerter from "../../../hook/useOutsideAlerter";
import {createError} from "../../../store/actions/error";
import Picker from "emoji-picker-react";
import {RECEIVED_MESSAGE, SEND_MESSAGE} from "../../../socket/socketEvent";
import socket from "../../../socket/socket";
import {
    addMessageAction,
    allConversationsAction,
    conversationMessageAction
} from "../../../store/actions/conversations";

const BoxChat = () => {
    const [messageValue, setMessageValue] = useState();
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const refMessage = useRef(null);
    const refPicker = useRef(null);
    const conversation = useSelector(state => state.conversation.conversation);
    const conversationActiveId = useSelector(state => state.conversation.conversationActiveId);
    const userId = useSelector(state => state.auth.user.userId);
    const history = useHistory();
    const isAuth = useSelector(state => state.auth.user.authenticated);
    const err = useSelector(state => state.error);
    const [newMessage, setNewMessage] = useState(null);
    const [message,setMessage] = useState(null)
    
    let sender,avatar,status;
    if (conversation) {
        sender = senderInfo(conversation.members, userId).usernames;
        avatar = senderInfo(conversation.members, userId).avatar;
        status = senderInfo(conversation.members, userId).status;
    }


    useOutsideAlerter(refPicker, () => {
        setShowPicker(prev => !prev)
    });
    const onEmojiClick = (event, emojiObject) => {
        refMessage.current.append(emojiObject.emoji);
        setMessageValue(refMessage.current.innerText);
    }

    const handleInputMessage = (p) => {
        setMessageValue(refMessage.current.innerText);
    }


    const handleEmoji = (e) => {
        if (e.currentTarget === e.target) {
            setShowPicker(prev => !prev);
        }

    }
    const handleEnterPress = (event) => {
        if (event.shiftKey && event.keyCode === 13) {
            return 1;
        } else if (event.keyCode === 13) {
            handleSubmit(event);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            content: messageValue,
            sender: userId,
            _id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        }
        const receiverId = senderInfo(conversation.members, userId).id.toString();
        const data = {
            ...message,
            receiverId: receiverId,
            conversationId: conversationActiveId,
        }

        socket.emit(SEND_MESSAGE, data);
        sendMessage(conversationActiveId, messageValue)
            .then(res => {
                console.log(res);
                setMessage(res);
                 dispatch(addMessageAction(message))
            })
            .catch(err => {
                if (err.response) {
                    dispatch(createError(err.response.data.message));
                }
            });
        refMessage.current.innerHTML = "";
    };

    useEffect(() => {
        if (isAuth) {
            getAllConversations()
                .then(data => {
                    dispatch(allConversationsAction(data));
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }, [message,isAuth]);
    useEffect(() => {
        socket.on(RECEIVED_MESSAGE, data => {
            const newMessage = {
                content: data.content,
                sender: data.sender,
                _id: data._id,
                conversationId: data.conversationId
            }
            setNewMessage(newMessage);
        });
    }, []);
    useEffect(() => {
        if (conversation && newMessage) {
            if (conversation._id === newMessage.conversationId) {
                dispatch(addMessageAction(newMessage));
            }
        }
    }, [newMessage]);

    useEffect(() => {
        if (err) {
            console.log(err);
        }
        if (!isAuth) {
            history.push('/login');
        }
    }, [isAuth, err]);
    
    useEffect(() => {
        if (conversationActiveId !== '') {
            getConversation(conversationActiveId)
                .then(res => {
                    dispatch(conversationMessageAction(res))
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [conversationActiveId]);
    
    return (
        <div className='bc'>
            <div className="header">
                <div className='header_person'>
                    <Avatar avatarUrl={avatar} status={status}/>
                    <h5>{sender}</h5>
                </div>
                <div className='header_option'>
                    <i className="fas option fa-phone-alt"/>
                    <i className="fas option fa-video"/>
                    <i className="fas option fa-info-circle"/>
                </div>
            </div>
            <div className='bc_messages'>
                {conversation && conversation.messages.map(m =>
                    <TextMessage avatarUrl={avatar} status={status} message={m.content} id={m.sender} key={m._id}/>
                )}
            </div>
            <div className='bc_footer'>
                <div className='bc_input'>
                <span ref={refMessage} className='bc_input_message' onInput={handleInputMessage}
                      onKeyDown={handleEnterPress} contentEditable/>
                </div>
                <div className='chat_input_link'>
                    <i id='emoji' className="fas fa-smile-beam" onClick={handleEmoji}>
                        {showPicker ?
                            <div ref={refPicker}>
                                <Picker onEmojiClick={onEmojiClick} classname='emoji-picker-react'/>
                            </div>
                            : null}
                    </i>
                    <input type="file" style={{display: "none"}}/>
                    <i className="fas fa-image"/>
                    <i className="fas fa-paperclip"/>
                    <button type='submit' onClick={handleSubmit} className='bc_button'>
                        <i className="fas fa-paper-plane"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default BoxChat;
