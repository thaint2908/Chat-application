import React, {useRef, useState} from "react";
import './SideBar.css';
import logo from '../../../assets/images/logo.e41f6087.png'
import useOutsideAlerter from "../../../hook/useOutsideAlerter";

import {useDispatch, useSelector} from "react-redux";
import {logoutAuth} from "../../../store/actions/auth";
import {activeSidebar} from "../../../store/actions/sidebar";
import socket from "../../../socket/socket";
import {OUT_ROOM} from "../../../socket/socketEvent";

const SideBar = (props) => {
    const dispatch = useDispatch();
    const [dropUp, setDropUp] = useState(false);
    const userId = useSelector(state => state.auth.user.userId)
    const activeSideBar = useSelector(state => state.sidebar.activeSidebar)
    const dropUpRef = useRef(null);
    const user = useSelector(state => state.user);
    let url = "http://localhost:8080/public/img_201506032132336642-758d7.jpg"
    if(user.avatarUrl){
        url = "http://localhost:8080/public/" + user.avatarUrl;
    }
    useOutsideAlerter(dropUpRef, () =>{
        setDropUp(prev =>!prev);
    })
    const handleDropUp = () => {
        setDropUp(prev => !prev);
    }

    const handleClick = (e) => {
        dispatch(activeSidebar(e.currentTarget.id))
    };

    const handleLogOut = () => {
        socket.emit(OUT_ROOM,userId);
        dispatch(logoutAuth())
    };

    return (
        <div className='side-menu me-lg-1 flex-lg-column'>
            <div className='navbar-brand-box'>
                <a className="logo logo-dark" href="/">
                        <span className="logo-sm">
                            <img src={logo} height="30" alt='logo'/>
                        </span>
                </a>
            </div>

            <div className="flex-lg-column my-auto">
                <ul role="tablist" className="side-menu-nav justify-content-center nav nav-pills">
                    <li id="profile" className={activeSideBar === "profile" ? "nav-item active" : "nav-item"}
                        onClick={handleClick}>
                        <a id="pills-user-tab" className=" nav-link">
                            <i className="far fa-user"/>
                        </a>
                    </li>
                    <li id="chats" className={activeSideBar === "chats" ? "nav-item active" : "nav-item"}
                        onClick={handleClick}>
                        <a id="pills-chat-tab" className="nav-link">
                            <i className="far fa-comment-dots"/>
                        </a>
                    </li>
                    <li id="contacts" className={activeSideBar === "contacts" ? "nav-item active" : "nav-item"}
                        onClick={handleClick}>
                        <a id="pills-contacts-tab" className="nav-link">
                            <i className="fas fa-list"/>
                        </a>
                    </li>
                </ul>
            </div>


            <div className="flex-lg-column d-none d-lg-block">
                <ul className="side-menu-nav justify-content-center nav">
                    <li className="nav-item">
                        <a id="light-dark" target="_blank" href="#" className="nav-link">
                            <i className="far fa-moon"/>
                        </a>
                    </li>
                    <li className="nav-item btn-group profile-user-dropdown  nav-item">
                        <a aria-haspopup="true" className="nav-link" aria-expanded="false">
                            <img src={url} alt="" className="profile-user" onClick={handleDropUp}/>
                        </a>
                        {
                            dropUp ?
                                <div className='dropup' ref={dropUpRef}>
                                    <a className='dropup_item' onClick={handleLogOut}>Log out</a>
                                </div> : null
                        }

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;