
import React from "react";
import './Avatar.css'

const Avatar = (props) =>{

       const url = "http://localhost:8080/public/" + (props.avatarUrl  || "img_201506032132336642-758d7.jpg")
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