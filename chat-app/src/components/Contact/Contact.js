import React, {useRef, useState} from "react";
import './Contact.css';
import useOutsideAlerter from "../../hook/useOutsideAlerter";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {conversationActive} from "../../store/actions/conversations";
import {getAllConversations} from "../../api/convensations";

const Contact = (props) => {
    const dropDownRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const conversationActiveId = useSelector(state => state.conversation.conversationActiveId)
    const [dropDown, setDropDown] = useState(false);
    const handleDropDown = () => {
        setDropDown(prev => !prev)
    }
    useOutsideAlerter(dropDownRef, () => {
        setDropDown(prev => !prev);
    });
    const handleClick = () => {
        getAllConversations(props.id,null)
            .then(data => {
                if (data) {
                    dispatch(conversationActive(data._id));
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className='contact'>
            <div className="d-flex align-items-center">
                <div className="flex-1" onClick={handleClick}>
                    <h5 className="contact_h5">{props.name}</h5>
                </div>
                <div style={{position: "relative"}}>
                    <a aria-haspopup="true" className="text-muted" aria-expanded="false">
                        <i className="fas fa-ellipsis-v" onClick={handleDropDown}/>
                    </a>
                    {
                        dropDown ?
                            <div className='dropdown' ref={dropDownRef}>
                                <a className='dropdown_item'>Remove</a>
                            </div> : null
                    }
                </div>
            </div>
        </div>
    )
};
export default Contact;
