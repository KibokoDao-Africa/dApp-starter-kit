import './ConnectWalletModal.css'; 
import { client} from '../../WalletFunctionalities/WagmiWallet';
import { useAccount, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';
import renderConnectors from './RenderConnectors';


// eslint-disable-next-line react/prop-types
const ConnectWalletModal = ({ closeModal, modalIsOpen, setWalletConnected, setAccount }) => {
  const [ethereumPresent, setEthereumPresent] = useState(false); 
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  
  // Client needs to be declared over here or the useAccount() hook will bring an error
  const wagmiClient = client; 
  const { address, connector, isConnected } = useAccount(); 
  
  // Function for connecting wallet
  const handleSignUpWithWagmi = async (connector) => {
    try {
      console.log("Connecting...");

      // Destructured from useConnect() import, passes the 'connector' as a parameter
      connect(connector)
      console.log("Is connected: ", isConnected); 

      if (!isConnected && address == undefined ){
        setWalletConnected(false)
      } else {
        setWalletConnected(true)
      }
      if (address){
        setTimeout(() => {
          closeModal()
        }, 3000)
      } else {
        setTimeout(() => {
        closeModal()
      }, 10000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkIfWalletInstalled = () => {
    const ethereum = window.ethereum; 

    if (ethereum !== undefined){
      setEthereumPresent(true)
    }
  }

  useEffect(() => {
    setAccount(address)
    checkIfWalletInstalled(); 
  }, []) 

  return modalIsOpen && (
    <div className="loading-modal">
      <div className="modal-container">
      
        <div className='modal-button'>
          <div onClick={closeModal}>X</div>
        </div>

        <div className='modal-connectors'>
          <p>Choose your preferred wallet provider</p>
          { 
            ethereumPresent && (
              renderConnectors(connectors, handleSignUpWithWagmi, isLoading, pendingConnector)
            )
          }
          {
            !ethereumPresent && (
              <>
                <a className='wallet-button' href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target='_blank'>Metamask</a>
                <a className='wallet-button' href='https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad' target='_blank'>Coinbase</a>
                <a className='wallet-button' href='https://explorer.walletconnect.com/' target='_blank'>WalletConnect</a>
              </>
            )
          }
        </div>
        {error && <div className='error'>{error.message}</div>}
      </div>
    </div>
  );
};

const buttonStyle = (connector) => ({
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
  margin: '5px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  opacity: connector.ready ? 1 : 0.5,
});



export default ConnectWalletModal;