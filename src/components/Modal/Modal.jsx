// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { MdClose } from "react-icons/md";
import { useSelector } from 'react-redux';


const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  const closeModal = () => {

    setIsOpen(false)

  }

  const darkMode = useSelector(state => state.color.darkmode)

  console.log("Darkmode dashboard",darkMode)

  const currentmode = darkMode === "On"

  return ReactDOM.createPortal(
    <div className={`main-modal-container ${currentmode ? "main-modal-container_dark" : ""}`}>
      <div>
        <div className={`modal-content ${currentmode ? "modal-content_dark" : ""}`}><button onClick={closeModal} className='main-modal-close'><MdClose /></button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('overlays') // Ensure you have a div with id="modal-root" in your HTML file
  );
};

export default Modal;


