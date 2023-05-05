// import {useState} from 'react'; 
import './Navbar.css'
import { useDisconnect, WagmiConfig } from "wagmi";
import { client } from '../../WalletFunctionalities/WagmiWallet';

function Navbar({ openModal, account, walletConnected, setWalletConnected  }) {
  const { disconnect } = useDisconnect();

  // Disconnect connected wallet 
  const handleWagmiDisconnect = () => {
    try {
      disconnect(); 
      setWalletConnected(false); 
      console.log("Account disconnected!"); 
    } catch (error){
      console.error(error)
    }
  }


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
            <button className='connect-button' onClick={handleWagmiDisconnect}>Disconnect Wallet</button>
          )
        }
        
      </div>
    </WagmiConfig>
  );
}

export default Navbar;
