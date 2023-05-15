import { useState, useEffect } from 'react';
import contractInstance from '../../ContractInstance/ContractInstance';
import './Header.css'

function Header({ walletConnected }) {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false); 
  const [txHash, setTxHash] = useState(""); 

  const sendInputMessage = async (e) => {
    try {
      e.preventDefault();
      const simpleStorage = await contractInstance(true); 
      
      setIsLoading(true); 
      const tx = await simpleStorage.set(inputMessage); 
      await tx.wait(); 
      
      setIsLoading(false); 
      setTxHash(tx.hash); 

      setIsSuccess(true); 

      setTimeout(() => {
        setIsSuccess(false)
      }, 5000); 

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
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
        <img src='./logo4.png' alt="logo" />
      </div>
       
      {
        !walletConnected ? (
            <div className='warning-box'>
              <p>Connect your wallet to get started</p><br/>
              <p>Check out the <a href='https://github.com/Stephen-Kimoi/dApp-starter-kit#readme' target='_blank'>documentation</a></p>
            </div>
        ) : (
            <div className='message-container'>
              <p>Send a message to blockchain</p>
              <form className='form'>
                <input 
                  type='text'
                  placeholder='Write any message'
                  onChange={ (e) => setInputMessage(e.target.value) }
                  value={inputMessage}
                />
              <button onClick={sendInputMessage}>Send message</button>
              </form>
                  { 
                    isLoading && (
                      <div className='loading-div'>
                        <p>Sending message...</p>
                      </div>
                    ) 
                  }
                  {isSuccess && (
                    <div className='success-div'>
                      Message sent succesfully! 
                      <div>
                        <a href={`https://mumbai.polygonscan.com/tx/${txHash}`} target='_blank'>Check polygonscan</a>
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
