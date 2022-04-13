import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

function Modal({children}) {
    return (
        ReactDOM.createPortal( // Renderizo en otro nodo/elemento de HTML los children de Modal
            <div className='ModalBackground'> {children} </div>, document.getElementById('modal')
        )
    );
}

export { Modal }