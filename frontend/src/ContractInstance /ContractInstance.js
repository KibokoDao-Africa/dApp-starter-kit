import abi  from '../contracts/SimpleStorage.json'; 
import { SimpleStorage as contractAddress } from '../contracts/contracts-address.json'; 
// import { ethers } from 'ethers';
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi'

// const contractInstance = async (needSigner = false) => {
//     try {
//       let simpleStorage; 

//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       console.log("Account connected is: ", accounts);  

//       const provider = new ethers.providers.Web3Provider(window.ethereum); 
//       const signer = await provider.getNetwork(); 

//       if (needSigner) {
//         simpleStorage = new ethers.Contract(contractAddress, abi.abi, signer); 
//       } else {
//         simpleStorage = new ethers.Contract(contractAddress, abi.abi, provider); 
//       }
//       console.log("Contract is: ", simpleStorage); 
//       return simpleStorage;  
//     } catch (error) {
//         console.error(error)
//     }
// }

// export default contractInstance; 

const SendMessage = async (messsage) => {
    const { config } = usePrepareContractWrite({
        address: contractAddress, 
        abi: abi.abi[2], 
        functionName: 'set', 
        args: [messsage], 
    })

    console.log("Config is: ", config); 
    }

export default SendMessage; 