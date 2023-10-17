import abi  from '.../contracts/Counter.json'; 
import { SimpleStorage as contractAddress } from '../contracts/contracts-address.json'; 
import { ethers } from 'ethers';

const contractInstance = async (needSigner = false) => {
    try {
      let simpleStorage; 

      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      const signer = await provider.getSigner(); 

      if (needSigner) {
        simpleStorage = new ethers.Contract(contractAddress, abi.abi, signer); 
      } else {
        simpleStorage = new ethers.Contract(contractAddress, abi.abi, provider); 
      }

      return simpleStorage;  
    } catch (error) {
        console.error(error)
    }
}

export default contractInstance; 

