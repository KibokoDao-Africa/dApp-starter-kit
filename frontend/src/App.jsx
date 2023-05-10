import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ConnectWalletModal from './components/ConnectWalletModal/ConnectWalletModal';
import { WagmiConfig } from 'wagmi'
import { client } from './WalletFunctionalities/WagmiWallet';
import Header from './components/Header/Header';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [account, setAccount] = useState(""); 
  const [walletConnected, setWalletConnected] = useState(false); 


  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <WagmiConfig client={client}>
       
       <ConnectWalletModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setWalletConnected={setWalletConnected}
        setAccount={setAccount}
      />

      <Navbar 
        openModal={openModal}
        account={account} 
        walletConnected={walletConnected} 
        setWalletConnected={setWalletConnected}
        setAccount={setAccount}
      />

      <Header 
        walletConnected={walletConnected}
      />
    </WagmiConfig>
  )
}

export default App
