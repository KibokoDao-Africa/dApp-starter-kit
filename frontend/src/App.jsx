import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ConnectWalletModal from './components/ConnectWalletModal/ConnectWalletModal';
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
    <>

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
    </>

  )
}

export default App
