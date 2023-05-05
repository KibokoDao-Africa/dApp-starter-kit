import './ConnectWalletModal.css'; 
import { client } from '../../WalletFunctionalities/WagmiWallet';
import { useAccount, useConnect } from 'wagmi';
import { useEffect } from 'react';


// eslint-disable-next-line react/prop-types
const ConnectWalletModal = ({ closeModal, modalIsOpen, setWalletConnected }) => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const wagmiClient = client; 
  const { address, connector, isConnected } = useAccount(); 

  const handleSignUpWithWagmi = async (connector) => {
    try {
      console.log("Handle sign up with Wagmi");
      connect(connector)
      setWalletConnected(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log("Connectors: ", connectors); 
  }, []) 

  return modalIsOpen && (
    <div className="loading-modal">
      <div className="modal-container">
      
        <div className='modal-button'>
          <button onClick={closeModal}>X</button>
        </div>

        <div className='modal-connectors'>
          <p>Choose your preferred wallet provider</p>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              disabled={!connector.ready}
              onClick={ () => handleSignUpWithWagmi({ connector }) }
              style={buttonStyle(connector)}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
          ))}
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