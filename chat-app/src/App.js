import React, { useEffect } from 'react';
import './App.css'
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SignUp/SignUp';
import NotFoundPage from './containers/404/NotFoundPage';
import Home from './containers/Home/Home';
import SideBar from './containers/Home/SideBar/SideBar';
import Contacts from './containers/Home/Contacts/Contacts';
import BoxChat from './containers/Home/BoxChat/BoxChat';
import UserProfileSidebar from './containers/Home/UserProfileSidebar/UserProfileSidebar';
import Chats from './containers/Home/Chats/Chats';
import socket from './socket/socket';
import { JOIN } from './socket/socketEvent';
import { useSelector } from 'react-redux';


const App = () => {
    const userId = useSelector(state => state.auth.user.userId)
    useEffect(() => {
        if (userId) {
            socket.emit(JOIN, {userId: userId})
        }
    }, [userId]);
    return (
        <Switch>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/signup">
                <SignUp/>
            </Route>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route>
                <NotFoundPage/>
            </Route>
        </Switch>
    
    )
}

export default App;
