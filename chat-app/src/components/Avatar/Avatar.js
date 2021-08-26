
import React from "react";
import './Avatar.css'

const Avatar = (props) =>{
    let url = "http://localhost:8080/public/img_201506032132336642-758d7.jpg"
    if(props.avatarUrl){
        url = "http://localhost:8080/public/" + props.avatarUrl;
    }
    return(
        <div className="user" >
            <img src={url} className="avt" alt="Avatar"/>
            <span className={props.status? 'user-status':'user-status offline'}>
                     <i className='cs_icon '/>
                 </span>
        </div>
    )
}
export default Avatar;