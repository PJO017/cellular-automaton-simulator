import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.scss';

const modalRoot = document.querySelector("#modal-root");

export const Modal = props => {
    const { open, onClose, children } = props;
    
    const modal = (
        <>
            <CSSTransition in={open} timeout={200} unmountOnExit classNames="modal">
                <div className="overlay">
                    <div className="container">
                        {children}
                        <button 
                            onClick={onClose}
                            className="closeButton">
                                Close
                        </button>
                    </div>
                </div>
            </CSSTransition>
        </>
    )

    return ReactDOM.createPortal(modal, modalRoot);
}
