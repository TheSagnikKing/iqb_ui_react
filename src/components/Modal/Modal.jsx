// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { MdClose } from "react-icons/md";


const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  const closeModal = () => {

    setIsOpen(false)

  }

  return ReactDOM.createPortal(
    <div className="main-modal-container">
      <div>
        <div className="modal-content"><button onClick={closeModal} className='main-modal-close'><MdClose /></button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('overlays') // Ensure you have a div with id="modal-root" in your HTML file
  );
};

export default Modal;


