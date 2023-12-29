import React, { useState } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function ModalWindowContrasena({ isOpen, onRequestClose, onSubmit }) {
 

  return (
    <Modal isOpen={isOpen} onAfterClose={onRequestClose}>
        <div>
            <input input type='text' name='password'  className="form-control"></input>
            
            <button className="btn btn-danger" onClick={onRequestClose}>Cerrar</button>
        </div>

    </Modal>
  );
}
