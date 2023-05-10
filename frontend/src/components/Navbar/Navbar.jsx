// import {useState} from 'react'; 
import './Navbar.css'
import { useDisconnect, WagmiConfig } from "wagmi";
import { client } from '../../WalletFunctionalities/WagmiWallet';
import { useEffect } from 'react';

function Navbar({ openModal, account, walletConnected, setWalletConnected, setAccount  }) {
  const { disconnect } = useDisconnect();

  // Disconnect connected wallet 
  const handleWagmiDisconnect = () => {
    try {
      disconnect(); 
      setWalletConnected(false); 
      setAccount(""); 
      console.log("Account disconnected!"); 
    } catch (error){
      console.error(error)
    }
  }

  useEffect(() => {
    console.log("Account is: ", account); 
  })


  return (
    <WagmiConfig client={client}>
      <div className="navbar">
        <div className="logo">
          <img src="./vite.svg" alt="logo" />
          <p>DappStarterKit</p>
        </div>

        {
          !walletConnected && (
            <button className="connect-button" onClick={openModal} >Connect Wallet</button>
          )
        }

        {
          walletConnected && (
            <div>
              {
                account && (
                  <button className='connect-button'>
                    { account.slice(0,6) + "..." + account.slice(38,42) }
                  </button>
                )
              }
              <button className='connect-button' onClick={handleWagmiDisconnect}>Disconnect Wallet</button>
            </div>
          )
        }
        
      </div>
    </WagmiConfig>
  );
}

export default Navbar;
