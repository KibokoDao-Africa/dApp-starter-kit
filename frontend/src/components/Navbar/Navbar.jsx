// import {useState} from 'react'; 
import './Navbar.css'

function Navbar({ openModal }) {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="./vite.svg" alt="logo" />
        <p>DappStarterKit</p>
      </div>
      <button className="connect-button" onClick={openModal} >Connect Wallet</button>
    </div>
  );
}

export default Navbar;
