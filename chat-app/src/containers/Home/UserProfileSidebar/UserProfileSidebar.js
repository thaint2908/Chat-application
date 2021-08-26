import React, {Component} from "react";
import './UserProfileSidebar.css'
import Avatar from "../../../components/Avatar/Avatar";

class UserProfileSidebar extends Component{
    render() {
        return (
            <div className='user_profile'>
                <div className='up_close'>
                    <button type='button' className='up_button'><i className="fas fa-times"/></button>
                </div>
                <div className='up_avt'>
                    <img src="" className="up_img" alt='chatvia'/>
                    <h5 style={{marginTop:"1.5rem"}}>Tên người dùng</h5>
                    <p style={{marginTop:".5rem"}}><i className="fas fa-dot-circle"/>Trạng thái</p>
                </div>
            </div>
        );
    }
};
export default UserProfileSidebar;