import React, { useState } from 'react';
import './PopupModal.css';

const PopupModal = ({ showModal, handleCloseModal, modalTitle, modalContent }) => {

  return (
    <div>
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          {/* <button className='modal-close' onClick={handleCloseModal}>
            X
          </button> */}
          {/* <h2 className='modal-title'>{modalTitle}</h2> */}

          <div>
            {modalContent}
          </div>

          {/* <button className="close-btn" onClick={handleCloseModal}>
            Submit
          </button> */}
        </div>
      </div>
    )}
  </div>
  );
};

export default PopupModal;
