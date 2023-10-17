import { useState, useEffect } from 'react';
import contractInstance from '../../ContractInstance/ContractInstance';
import './Header.css'

function Header({ walletConnected }) {
  const [isLoading, setIsLoading] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false); 
  const [counterValue, setCounterValue] = useState(0); 

  // Function for increasing count
  const increaseCount = async () => {
    try {
      const counter = await contractInstance(true); 
      setIsLoading(true); 
      const tx = await counter.increaseCount(); 
      await tx.wait(); 
      
      setIsLoading(false); 

      setIsSuccess(true); 

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000); 

    } catch (error) {
      console.error(error)
    }
  }

  // Function for decreasing count 
  const decreaseCount = async () => {
    try {
      const counter = await contractInstance(true); 
      setIsLoading(true); 
      const tx = await counter.decreaseCount(); 
      await tx.wait(); 
      
      setIsLoading(false); 

      setIsSuccess(true); 

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000); 
    } catch (error) {
      console.error(error)
    }
  }

  // Function for reading count from smart contract
  const readCount = async () => {
    try {
      const counter = await contractInstance(true); 
      const count = await counter.getCount(); 
      setCounterValue(count.toNumber()); 
     console.log("Count is: ", count.toNumber()); 
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
        {/* <img src='./logo4.png' alt="logo" /> */}
      </div>
       
      {
        !walletConnected ? (
            <div className='warning-box'>
              <p>Connect your wallet to get started</p><br/>
              <p>Check out the <a href='https://github.com/Stephen-Kimoi/dApp-starter-kit#readme' target='_blank' rel="noreferrer">documentation</a></p>
            </div>
        ) : (
          <div className='message-container'>
          <p>Count is { counterValue }</p>
          <div>
            <button className='functionButton' onClick={ () => increaseCount() }>Click to Increase Count +</button>
            <button className='functionButton' onClick={ () => decreaseCount() }>Click to Decrease Count -</button>
          </div>
          {/* Loading and success messages for increaseCount */}
          {isLoading && (
            <div className='loading-div'>
              <p>Calling function...</p>
            </div>
          )}
          {isSuccess && (
            <div className='success-div'>
              Success!
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
