import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'; 
import { useContractWrite } from 'wagmi'; 
import { useContractRead } from 'wagmi'; 
import { useNetwork } from 'wagmi'
import { Counter as contractAddress } from '../contracts/contracts-address.json'; 
import abi from '../contracts/Counter.json'
import './Header.css'

function Header() {
  const [counterValue, setCounterValue] = useState(0); 

  const { isDisconnected } = useAccount(); 
  const { chain } = useNetwork()
  
  // Wagmi style of calling a smart contract function (we are calling "increaseCount" function from Counter smart contract)
  const { isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: abi.abi,
    functionName: 'increaseCount',
  }); 

  // We are calling "decreaseCount" function from the Counter smart contract
  const { isLoading: loading, isSuccess: success, write: decreaseCountWrite } = useContractWrite({
    address: contractAddress,
    abi: abi.abi,
    functionName: 'decreaseCount',
  }); 
  
  // Wagmi style of reading a smart contract (we are calling "getCoubt" function from smart contract)
  const { data:CounterValue } = useContractRead({
    address: contractAddress,
    abi: abi.abi,
    functionName: 'getCount',
    watch: true 
  }); 
  
  // Function for increasing count
  const increaseCount = async () => {
    try {
       write(); 
    } catch (error) {
      console.error(error)
    }
  }

  // Function for decreasing count 
  const decreaseCount = async () => {
    try {
      decreaseCountWrite()
    } catch (error) {
      console.error(error)
    }
  }

  // Function for reading count from smart contract
  const readCount = async () => {
    try {
      setCounterValue(Number(CounterValue)); 
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    readCount(); 
    setTimeout(() => {
      let elements = document.getElementsByClassName('success-div');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
    }, 3000)
  })
  

  return (
    <div className='container'>

      <div className='header-logo'>
        <h1 className='title'>Dapp starter kit</h1>
      </div>
       
      {
        isDisconnected ? (
            <div className='warning-box'>
              <p>Connect your wallet to get started</p><br/>
              <p>Check out the <a href='https://github.com/Stephen-Kimoi/dApp-starter-kit#readme' target='_blank' rel="noreferrer">documentation</a></p>
            </div>
        ) : (
          <div className='message-container'>
          {chain.id !== 80001 && ( // Check if the chain is not 80001
            <div className='chain-warning-box'>
              <p>Warning: You are not connected to the correct chain. Switch to <a href='https://chainlist.org/?testnets=true&search=mumbai' target='_blank' rel="noreferrer">Polygon Mumbai</a></p>
            </div>
          )}
          <p>Count is { counterValue }</p>
          <div>
            <button className='functionButton' onClick={ () => increaseCount() }>Click to Increase Count +</button>
            <button className='functionButton' onClick={ () => decreaseCount() }>Click to Decrease Count -</button>
          </div>
          {/* Loading and success messages for increaseCount */}
          {isLoading && (
            <div className='loading-div'>
              <p>Calling increaseCount function...</p>
            </div>
          )}
          {isSuccess && (
            <div className='success-div'>
              Success for increaseCount!
              <div>
                {/* Additional details or links */}
              </div>
            </div>
          )}
          {/* Loading and success messages for decreaseCount */}
          {loading && (
            <div className='loading-div'>
              <p>Calling decreaseCount function...</p>
            </div>
          )}
          {success && (
            <div className='success-div'>
              Success for decreaseCount!
              <div>
                {/* Additional details or links */}
              </div>
            </div>
          )}
        </div>
        )
      }

    </div>
  );
}

export default Header;
