import React, { useEffect, useState } from 'react';
import './Person.css';
import Avatar from '../Avatar/Avatar';

import { sentTime } from '../../util/sentTime';
import { conversationActive, getActiveConversation } from '../../store/actions/conversations';
import { useDispatch, useSelector } from 'react-redux';
import parseMessage from '../../util/parseMessage';

const Person = (props) => {
    const dispatch = useDispatch();
    const {id, members, message} = props;
    const conversationIdActive = useSelector(state => state.conversation.conversationActiveId);
    const userId = useSelector(state => state.auth.user.userId);
    const date = new Date(message.date);
    const handleClick = () => {
        dispatch(getActiveConversation(id));
        message.is_read  = 1;

    };

    if(message.sender===userId || conversationIdActive === props.id){
       message.is_read = 1;
    }
    const handleMessage = (message) => {
        return {__html: message};
    }
    return (
        <div className="conversation" onClick={handleClick}>
            <div className={conversationIdActive === props.id ? 'flex-container active' : 'flex-container'}>
                <Avatar status={props.status} avatarUrl={props.avatarUrl}/>
                <div className="content">
                    <h5>{props.senders}</h5>
                    <p className={message.is_read ? "": "unread"} dangerouslySetInnerHTML={handleMessage(parseMessage(message.content))}/>
                </div>
                <div className="time">{sentTime(date)}</div>
            </div>
        </div>
    )
};
export default Person;
