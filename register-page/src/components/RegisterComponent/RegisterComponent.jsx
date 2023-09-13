import React, { useState } from 'react';
import './RegisterComponent.css'; 
import PopupModal from '../PopupModal/PopupModal';
import connectWallet from '../Connectwallet/ConnectWallet';
import getProviderOrSigner from '../../contractInstance';
import LoadingModal from '../Loading/Loading';
import PopupDiv from '../PopupDiv/PopupDiv';
import DAO from '../DAO/DAO';
import { ethers } from 'ethers';

const RegisterComponent = ({ registeredDAOs, setRegisteredDAOs, address, setAddress }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [loadingStatement, setLoadingStatement] = useState(""); 
  const [showPopup, setShowPopup] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(false); 
  const [showDao, setShowDao] = useState(false); 
  const [daoContent, setDaoContent] = useState(); 
  const [fileList, setFileList] = useState(null);

  let daoName;  
  let walletAddress1; 
  let walletAddress2; 
  let description; 
  let farmReports; 
  let financialReports; 

  // For register investor
  let investorName; 
  let investorAddress; 


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const submitRegisterInvestor = async () => {
    try {
      await connectWallet(); 
      const { farmDaoContract }  = await getProviderOrSigner(true); 

      console.log("Sending the details..."); 
      setShowModal(false); 
      setLoading(true); 

      const tx = await farmDaoContract.registerInvestor(
        investorName, 
        { gasLimit: 1000000 }
      )

      setLoadingStatement("Adding you as an investor...")

      await tx.wait(); 
      setLoading(false); 
      console.log("Succesful!")

      setShowPopup(true);
      setSuccess(true) 
      setTimeout(() => {
        setShowPopup(false)
        setSuccess(false)
      }, 100000); 
    } catch (error){
      console.error(error); 

      setShowPopup(true);
      setError(true) 
      setTimeout(() => {
        setShowPopup(false); 
        setError(false)
      }, 3000)
    }
  }

  const handleLogin = async () => {
    const { ethereum } = window; 
    const accounts = await ethereum.request({ method: "eth_requestAccounts" }); 
    const account = accounts[0]; 

    for (let i = 0; i < registeredDAOs.length; i++){
      const storedAddress = registeredDAOs[i][0];

      // Converting all addresses to lower case
      const lowercaseAccount = account.toLowerCase();
      const lowercaseStoredAddress = storedAddress.toLowerCase();

      if(lowercaseAccount == lowercaseStoredAddress){
        // Open up the modal containing the DAO registered with the wallet
        setShowDao(true); 
        setDaoContent(registeredDAOs[i]); 
        console.log(`Connected account ${account} matches the address ${registeredDAOs[i][0]}`)
      } else {
        window.alert("Kindly register your DAO to get started!"); 
        console.log("Connected account does not match"); 
      }
    }

  }

  const getRegisteredDAOs = async () => {
    await connectWallet(); 
    const { farmDaoContract }  = await getProviderOrSigner(false); 
    console.log("Fetching DAOs...")
    const allDAOs = await farmDaoContract.getAllDaos(); 
    
    console.log("DAOs created are: ", allDAOs)
    setRegisteredDAOs(allDAOs); 
  }

  const submitRegister = async (event) => {
    try {

      const { farmDaoContract } = await getProviderOrSigner(true); 

      console.log("Creating the DAO..."); 
      setShowModal(false); 
      setLoading(true); 
      setLoadingStatement("Creating the DAO...")
      // console.log("Addr")
      const tx = await farmDaoContract.createDao(
        walletAddress1, 
        walletAddress2, 
        description, 
        farmReports,
        financialReports, 
        daoName, 
        { gasLimit: 1000000 }
      )
      console.log("Adding DAO...")
      setLoadingStatement("Adding DAO...")

      await tx.wait(); 
      setLoading(false); 
      console.log("DAO created succesfully!")

      setShowPopup(true);
      setSuccess(true) 
      setTimeout(() => {
        setShowPopup(false)
        setSuccess(false)
      }, 3000); 

      getRegisteredDAOs(); 

    } catch (error) {
      console.error(error); 

      setShowPopup(true);
      setError(true) 
      setTimeout(() => {
        setShowPopup(false); 
        setError(false)
      }, 3000)
    }

  }


  const handleShowModal = async (title) => {
    console.log("Connecting wallet...")
    const account =  await connectWallet(); 
    setAddress(account); 

    setModalTitle(title);
    if (title === "REGISTERFARMER") {
      setModalContent(
        <div className='content-container'>
          <div>
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Name" 
              name="Name"
              onChange={ (e) => {
                daoName = e.target.value
              }}
              />
          </div>
          <div>
            <label>Wallet Address 1</label>
            <input 
              type="text" 
              placeholder="Wallet Address 1" 
              name='walletAddress1'
              onChange={ (e) => {
                walletAddress1 = e.target.value
              }}
              />
          </div>
          <div>
            <label>Wallet Address 2</label>
            <input 
              type="text" 
              placeholder="Wallet Address 2" 
              name='walletAddress2'
              onChange={ (e) => {
                walletAddress2 = e.target.value
              }}
            />
          </div>
          <div>
            <label>Description</label>
            <input 
              type="text"  
              placeholder="Description" 
              name='description'  
              onChange={ (e) => {
                description = e.target.value
              }}
            />
          </div>
          <div>
           <label>Financial Reports</label>
           <input 
              type="text" 
              placeholder='Insert Google Drive Link'
              name='financialReports'
              onChange={ (e) => {
                financialReports = e.target.value
              }}
            />
          </div>
          <div>
            <label>Farm Reports</label>
            <input 
              type="text" 
              placeholder='Insert Google Drive Link'
              name='farmReports'
              onChange={ (e) => {
                farmReports = e.target.value
              }} 
            />
          </div>
          <button className="close-btn" onClick={submitRegister}>
            REGISTER
          </button> 
        </div>
      );
    } else if (title === "REGISTERINVESTOR") {
      setModalContent(
        <div className="content-container">
          <div>
            <label>Your Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              name="loginName"
              onChange={ (e) => {
                investorName = e.target.value
              }}
              />
          </div>
          <div>
            <label>Wallet Address</label>
            <input 
              type="text" 
              placeholder="Wallet Address" 
              name='loginAddress'
              onChange={ (e) => {
                investorAddress = e.target.value
              }}
              />
          </div>

          <button className="close-btn" onClick={submitRegisterInvestor}>
            REGISTER
          </button>
        </div>
      );
    }
    setShowModal(true);
  };

  return (
    <div className='dao-container' id="daodashboard">

      {
        showDao && (
          <DAO 
            daoContent={daoContent}
            setShowDao={setShowDao}
          />
        )
      }
      <LoadingModal 
        loading={loading}
        loadingStatement={loadingStatement}
      />

      <PopupDiv 
        showPopup={showPopup}
        error={error}
        succes={success}
      />
       
      <div className='description-container'>

        <div className='description-part'>
          <div className='description-text'>
            <p className='dao-description'>
              Make the first step <br/> Register to the as a farmer or Investor <br/> To get started
            </p>
            <div>
              <button className="register-button" onClick={() => { handleShowModal("REGISTERFARMER", "This is the Register Modal Content"); connectWallet() }}>Register as a farmer</button>
              <button className="register-button" onClick={() => { handleShowModal("REGISTERINVESTOR", "This is the Register Modal Content"); connectWallet() }}>Register as an Investor</button>
              {/* <button onClick={() => { handleLogin(); connectWallet() }}>Login DAO</button> */}
              <p className='dao-register'>Already registered? <a href='http://localhost:5174/'>Login</a></p>
            </div>
          </div>

          <div className="image-container">
            {/* <p>Image container</p> */}
            <img className="description-image" src="./farmer.jpg" />
          </div>
        </div>

      </div>

      <PopupModal 
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
      
    </div>
  );
};

export default RegisterComponent;
