import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterComponent from './components/RegisterComponent/RegisterComponent'

function App() {
  const [count, setCount] = useState(0)
  const [registeredDAOs, setRegisteredDAOs] = useState([]); 
  const [address, setAddress] = useState(); 
  const [walletConnected, setWalletConnected] = useState(); 
  
  return (
    <>
      <RegisterComponent
        registeredDAOs={registeredDAOs}
        setRegisteredDAOs={setRegisteredDAOs}
        address={address}
        setAddress={setAddress}
      />
    </>
  )
}

export default App
