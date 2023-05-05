import React from 'react';
import './Header.css'

function Header({walletConnected}) {
  return (
    <div className='container'>

      <div className='header-logo'>
        <h1 className='title'>Dapp starter kit</h1>
        <img src='./vite.svg' alt="logo" />
      </div>
       
      {
        !walletConnected ? (
            <div className='warning-box'>
              <p>Connect your wallet to get started</p>
            </div>
        ) : (
            <div className='warning-box'>
              <p>Wallet connected</p>
            </div>
        )
      }

    </div>
  );
}

export default Header;
