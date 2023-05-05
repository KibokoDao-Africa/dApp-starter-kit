import React from 'react';
import Modal from 'react-modal';
import './ConnectWalletModal.css'; 


const ConnectWalletModal = ({ closeModal, modalIsOpen }) => {
  return modalIsOpen && (
    <div className="loading-modal">
      <div className="modal-container">
      
        <div className='modal-button'>
          <button onClick={closeModal}>X</button>
        </div>

        <div>
          <p>Choose your preferred wallet provider</p>
          <button className="wallet-button">Metamask</button>
          <button className="wallet-button">Coinbase</button>
          <button className="wallet-button">WalletConnect</button>
        </div>
  
      </div>
    </div>
  );
};

export default ConnectWalletModal;