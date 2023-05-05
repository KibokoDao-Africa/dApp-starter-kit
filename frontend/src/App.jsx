import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ConnectWalletModal from './components/ConnectWalletModal/ConnectWalletModal';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Navbar 
        openModal={openModal}
      />

      <ConnectWalletModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </>
  )
}

export default App
