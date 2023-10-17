import abi  from '../contracts/Counter.json'; 
import { Counter as contractAddress } from '../contracts/contracts-address.json'; 
import { ethers } from 'ethers';

const contractInstance = async (needSigner = false) => {
    try {
      let counter; 

      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      const signer = await provider.getSigner(); 

      if (needSigner) {
        counter = new ethers.Contract(contractAddress, abi.abi, signer); 
      } else {
        counter = new ethers.Contract(contractAddress, abi.abi, provider); 
      }

      return counter;  
    } catch (error) {
        console.error(error)
    }
}

export default contractInstance; 

