import React from "react";
import './HeaderSideBox.css'
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "../../store/actions/modal";

const HeaderSideBox = (props) =>{
    const dispatch = useDispatch();
    const addContact = () =>{
        dispatch(openModal(true))
    }
    return(
        <div className='cs_header'>
            <div style={{display:"flex"}}>
                <h4 style={{fontSize:"20px",flexGrow:1}}>{props.title}</h4>
                { props.title === "Contacts" ?
                    <i className="fas fa-user-plus add-contact" onClick={addContact}/>:null
                }
            </div>
            <div className='cs_search'>
                        <span className='cs_span'>
                            <i className="fas fa-search"/>
                        </span>
                <input placeholder='Search users' type='search' className='cs_input'/>
            </div>
        </div>
    )
};
export default HeaderSideBox;