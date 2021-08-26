import React, { useRef, useState } from 'react';
import './AddContactModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/actions/modal';
import useOutsideAlerter from '../../hook/useOutsideAlerter';
import { postContact } from '../../api/user';
import { loaded, loading } from '../../store/actions/loading';
import { clearError } from '../../store/actions/error';
import { addContact } from '../../store/actions/user';

const AddContactModal = () => {
    const dispatch = useDispatch();
    const err = useSelector(state => state.error)
    const openModal = useSelector(state => state.modal.openModal);
    const [email, setEmail] = useState();
    const handleCloseModal = () => {
        dispatch(clearError());
        dispatch(closeModal());
    };
    const refModal = useRef();
    const handleAddContact = () => {
        const params = new URLSearchParams();
        params.append('email', email);
        postContact(params,dispatch)
            .then(res =>{
                dispatch(loading());
                dispatch(closeModal());
                dispatch(addContact(res.data))
                dispatch(loaded());
            })
            .catch(err => {
                console.log(err);
            })
    };
    useOutsideAlerter(refModal, () => {
        dispatch(closeModal());
        dispatch(clearError());
    })
    
    const handleChangeInput = (e) => {
        setEmail(e.target.value);
    };
    
    return (
        <div className="modal-background">
            <div className="modal-container" ref={refModal}>
                <div className="modal-header">
                    <h3>Add Contact</h3>
                    <i className="fas fa-times exit-icon" onClick={handleCloseModal}/>
                </div>
                <div className="modal-main">
                    <label>Email</label>
                    <input type="text" placeholder="Enter email" onChange={handleChangeInput}/>
                </div>
                <div className="modal-submit">
                    {err &&
                    <div className="err">
                        <span>
                            {err}
                        </span>
                    </div>
                    }
                    <button onClick={handleAddContact}>Add Contact</button>
                </div>
            </div>
        </div>
    )
};

export default AddContactModal;
