import React, { useState } from 'react';
import './TextMessage.css';
import Avatar from '../../Avatar/Avatar';
import { useSelector } from 'react-redux';

const TextMessage = (props) => {
    const userId = useSelector(state => state.auth.user.userId)
    
    const handleMessage = () => {
        return {__html: props.message};
    }
    
    return (
        <div className="text_message">
            <div className="text_message_content" style={userId === props.id ? {float: 'right'} : {float: 'left'}}>
                {userId === props.id ? null : <Avatar status={props.status} avatarUrl={props.avatarUrl}/>}
                <p className="ts_p" dangerouslySetInnerHTML={handleMessage()}/>
            </div>
        </div>
    )
};
export default TextMessage;
