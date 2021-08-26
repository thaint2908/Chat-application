import React, {useEffect, useState} from "react";
import './Contacts.css'
import Contact from "../../../components/Contact/Contact";
import {useDispatch, useSelector} from "react-redux";
import HeaderSideBox from "../../../components/HeaderSideBox/HeaderSideBox";
import {getContactsAction} from "../../../store/actions/user";
import {openModal} from "../../../store/actions/modal";


const Contacts = () => {
    const dispatch = useDispatch();

    //const [contacts,setContacts] = useState(null);
    // const isAuth = useSelector(state => state.auth.user.authenticated);
    const [search,setSearch] = useState("");
    const contacts = useSelector(state => state.user.contacts)
    const addContact = () =>{
        dispatch(openModal(true))
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    };
    useEffect(()=>{
        dispatch(getContactsAction(search));
    },[search])
    return (
        <div className='cs'>
            <div className='cs_header'>
                <div style={{display:"flex"}}>
                    <h4 style={{fontSize:"20px",flexGrow:1}}>Contacts</h4>
                        <i className="fas fa-user-plus add-contact" onClick={addContact}/>
                </div>
                <div className='cs_search'>
                        <span className='cs_span'>
                            <i className="fas fa-search"/>
                        </span>
                    <input placeholder='Search users' onChange={handleChangeSearch} type='search' className='cs_input'/>
                </div>
            </div>
            <div style={{padding: "24px"}}>
                <ul className='list-unstyled contact-list'>
                    {contacts ?
                        contacts.map(contact => {
                            return <Contact key={contact._id} id={contact._id} name={contact.name}/>
                        }) : null
                    }
                </ul>
            </div>

        </div>
    )
}
export default Contacts;
