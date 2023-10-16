import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ConnectWalletModal from './components/ConnectWalletModal/ConnectWalletModal';
import Header from './components/Header/Header';

// Web3 Modal connection 
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { polygonMumbai, polygonZkEvmTestnet } from 'wagmi/chains'
import { useWeb3Modal } from '@web3modal/wagmi/react'

const projectId = 'e4079dd68ffa53c5102c7eeb500807ec'

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [ polygonMumbai, polygonZkEvmTestnet ]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })


function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [account, setAccount] = useState(""); 
  const [walletConnected, setWalletConnected] = useState(false); 
  const { open } = useWeb3Modal()
  

  function openModal() {
    open(); 
    setWalletConnected(true); 
    // setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <WagmiConfig config={wagmiConfig}>

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
        // open={open}
      />

      <Header 
        walletConnected={walletConnected}
      />

    </WagmiConfig>

  )
}

export default App
