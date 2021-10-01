import React, {useState} from 'react';
import './TextMessage.css';
import Avatar from '../../Avatar/Avatar';
import {useSelector} from 'react-redux';
import moment from "moment";

const TextMessage = (props) => {
    const userId = useSelector(state => state.auth.user.userId);
    let showTime;
    if(props.prevMess){
        console.log(props.prevMess.date);
        console.log(props.date);
        const date = new Date(props.date);
        const prevDate = new Date(props.prevMess.date);
        showTime = (date - prevDate)>300000 ;
        console.log(showTime);
    }
    const handleMessage = () => {
        return {__html: props.message};
    }

    const messageRender = () => {
        switch (props.kind) {
            case "text":
                return <p className="ts_p" dangerouslySetInnerHTML={handleMessage()}/>
            case "image":
                const images = props.message.split("|");
                if(images.length===1){
                    return <div className="single_image"><img src={"http://localhost:8080/public/" + images[0]} alt="Ảnh"/></div>
                }
                return (
                    <div className="image_message">
                        {images.map(image => {
                            return <div className="flex_item"><img src={"http://localhost:8080/public/" + image} alt="Ảnh"/></div>
                        })}
                    </div>
                );
            default:
                return <p>df</p>;
        }
    }
    return (
        <div className="text_message">
            <div style={{textAlign:"center"}}><p>{showTime? moment(props.date).format('MMMM Do YYYY, h:mm:ss a'):null}</p></div>
            <div className="text_message_content" style={userId === props.id ? {float: 'right'} : {float: 'left'}}>
                {userId === props.id ? null : <Avatar status={props.status} avatarUrl={props.avatarUrl}/>}
                {messageRender()}
            </div>
        </div>
    )
};
export default TextMessage;
