import './Navbar.css'
// import { useDisconnect } from "wagmi";
import { useEffect } from 'react';

function Navbar({ openModal, account, walletConnected, setWalletConnected, setAccount  }) {
  // const { disconnect } = useDisconnect();

  // Disconnect connected wallet 
  const handleDisconnect = () => {
    try {
      // disconnect(); 
      setWalletConnected(false); 
      setAccount(""); 
      console.log("Account disconnected!"); 
    } catch (error){
      console.error(error)
    }
  }

  useEffect(() => {
    // Console log the account connected
    console.log("Account is: ", account); 
  })


  return (
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
              <button className='connect-button' onClick={handleDisconnect}>Disconnect Wallet</button>
            </div>
          )
        }
        
      </div>
  );
}

export default Navbar;
