import React, {useRef, useState} from "react";
import './Profile.css'
import {useDispatch, useSelector} from "react-redux";
import {editAvatarAction, editProfileAction} from "../../../store/actions/user";
import moment from "moment";

const Profile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let url = "http://localhost:8080/public/img_201506032132336642-758d7.jpg"
    if(user.avatarUrl){
        url = "http://localhost:8080/public/" + user.avatarUrl;
    }
    const status = user.status ? "Đang hoạt động" : "Tạm vắng";
    const [editProfile, setEditProfile] = useState(false);
    const refAvt = useRef(null);
    const handleEditProfile = () => {
        setEditProfile(prev => !prev);
    };

    const handleButtonEdit = () => {
        refAvt.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const phoneNumber = e.target.phoneNumber.value;
        const birthday = e.target.birthday.value;
        dispatch(editProfileAction(name,phoneNumber,birthday));
        setEditProfile(false);
    };

    const handleEditAvatar = (e) => {
        dispatch(editAvatarAction(e.target.files[0]));
    };
    
    return (
        <div className="cs">
            <div className="name">
                <h5>My Profile</h5>
            </div>
            <div className='up_avt'>
                <img src={url} className="up_img" alt='chatvia'/>
                <input ref={refAvt} type="file" onChange={handleEditAvatar} hidden id="upload_avt"/>
                <button className="btn" onClick={handleButtonEdit}><i className="fas fa-pen"/></button>
            </div>
            <div className="status">
                <h5>Tên người dùng</h5>
                <p><i className="fas fa-dot-circle"/>{status}</p>
            </div>
            <button className="edit_btn" onClick={handleEditProfile}>{editProfile?"Cancel" : "Edit Profile"}</button>
            {editProfile ?
                <div className="information">
                    <form onSubmit={handleSubmit}>
                        <p>Name</p>
                        <input name="name" type="text" placeholder={user.name}/>
                        <p>Phone Number</p>
                        <input name="phoneNumber" type="text" placeholder={user.phoneNumber}/>
                        <p>Birthday</p>
                        <input name="birthday" type="date"/>
                        <div className="btn_submit" ><button type="submit">Submit</button></div>
                    </form>
                </div> :
                <div className="information">
                    <p>Name</p>
                    <h5>{user.name}</h5>
                    <p>Phone Number</p>
                    <h5>{user.phoneNumber}</h5>
                    <p>Birthday</p>
                    <h5>{moment(user.birthday).format("MM/DD/YYYY")}</h5>
                </div>
            }
        </div>
    )
};
export default Profile;