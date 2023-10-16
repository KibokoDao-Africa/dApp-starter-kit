import './Navbar.css'
import { useEffect } from 'react';
import { useAccount } from 'wagmi'; 
import { useWeb3ModalState } from '@web3modal/wagmi/react'; 


function Navbar({ openModal, account, walletConnected, setWalletConnected, setAccount  }) {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { open, selectedNetworkId } = useWeb3ModalState(); 

  console.log("Address is: ", address); 
  console.log("isConnecting: ", isConnecting); 
  console.log("isDisconnected: ", isDisconnected); 
  console.log("Web3 Modal state is: ", open); 


  // Disconnect connected wallet 
  const handleDisconnect = () => {
    try {
      setWalletConnected(false); 
      setAccount(""); 
      console.log("Account disconnected!"); 
    } catch (error){
      console.error(error)
    }
  }

  useEffect(() => {
    // Console log the account connected
    // console.log("Account is: ", useAccount); 
  })


  return (
      <div className="navbar">
        <div className="logo">
          <p>DappStarterKit</p>
        </div>

        {
          isDisconnected && (
            <>
              <button className="connect-button" onClick={openModal} >Connect Wallet</button>
              {/* <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button> */}
            </>
          )
        }

        {
          !isDisconnected && (
            <div>
              {
                account && (
                  <button className='connect-button'>
                    {/* { account.slice(0,6) + "..." + account.slice(38,42) } */}
                    <button onClick={() => open({ view: 'Account' }) }>Open Network Modal</button>
                  </button>
                )
              }
              <button className='connect-button' onClick={openModal}>Disconnect Wallet</button>
            </div>
          )
        }
        
      </div>
  );
}

export default Navbar;
