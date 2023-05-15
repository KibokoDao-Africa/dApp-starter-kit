import { useState, useEffect } from 'react';
import SimpleStorage  from '../../contracts/contracts-address.json'; // Imports contract address
import abi  from '../../contracts/SimpleStorage.json';  // Imports ABI
// import { useDebounce } from 'usehooks-ts'
// import { usePrepareContractWrite, useContractWrite, useWaitForTransaction  } from 'wagmi'
import './Header.css'

function Header({ walletConnected }) {
  const [inputMessage, setInputMessage] = useState("");
  // const debouncedMessage = useDebounce(inputMessage, 500);  
  
  // const { config } = usePrepareContractWrite({
  //   address: SimpleStorage.SimpleStorage, 
  //   abi: [abi.abi[2]], 
  //   functionName: 'set', 
  //   args: [debouncedMessage], 
  //   enabled: Boolean(debouncedMessage), 
  // })

  // const { write, data }  = useContractWrite(config); 

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  const sendInputMessage = async (e) => {
    try {
      e.preventDefault();
      // write?.(); 
      // setInputMessage(""); 
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // console.log("Success: ", isSuccess); 

    // if (isSuccess){
      setTimeout(() => {
        // setInputMessage(""); 
        let elements = document.getElementsByClassName('success-div');
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.display = 'none';
        }
      }, 3000)
    // }

  })
  

  return (
    <div className='container'>

      <div className='header-logo'>
        <h1 className='title'>Dapp starter kit</h1>
        <img src='./vite.svg' alt="logo" />
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
                  {/* { 
                    isLoading && (
                      <div className='loading-div'>
                        <p>Sending message...</p>
                      </div>
                    ) 
                  } */}
                  {/* {isSuccess && (
                    <div className='success-div'>
                      Message sent succesfully! 
                      <div>
                        <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`} target='_blank'>Check polygonscan</a>
                      </div>
                    </div>
                  )} */}
              </div>
        )
      }

    </div>
  );
}

export default Header;
