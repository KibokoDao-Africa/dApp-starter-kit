import './Navbar.css'
import { useAccount } from 'wagmi'; 


function Navbar({ openModal }) {
  const { address, isDisconnected } = useAccount()
  console.log("Address: ", address); 

  return (
      <div className="navbar">
        <div className="logo">
          <p>DappStarterKit</p>
        </div>

        {
          isDisconnected && (
            <>
              <button className="connect-button" onClick={openModal} >Connect Wallet</button>
            </>
          )
        }

        {
          !isDisconnected && (
            <div>
              <button className='connect-button' onClick={openModal}>Disconnect Wallet</button>
            </div>
          )
        }
        
      </div>
  );
}

export default Navbar;
