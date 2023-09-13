import { Provider } from "@ethersproject/providers";
import { 
  marketplaceAbi, 
  farmDaoAbi, 
  farmdaoContractAddress, 
  marketplaceContractAddress, 
  aggregatorAbi, 
  aggregatorV3InterfaceAddress, 
  priceConsumerAbi, 
  priceConsumerV3Address } from "./constants";
import { ethers } from "ethers";

const getProviderOrSigner = async (needSigner = false) => {
  try {

    let farmDaoContract; 
    let marketplaceContract; 
    // let priceFeed; 
    let priceConsumer; 
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const priceConsumerProvider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia")

    // const network = await provider.getNetwork(); 
    const signer = await provider.getSigner(); 

    // Testing whether the aggregator code matches the latest version
    // const test = await aggregatorProvider.getCode(aggregatorV3InterfaceAddress); 

    if (needSigner) {
      farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, signer); 
      marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceAbi, signer); 
      // priceFeed = new ethers.Contract(aggregatorV3InterfaceAddress, aggregatorAbi, aggregatorProvider); 
      // priceConsumer = new ethers.Contract(priceConsumerV3Address, priceConsumerAbi, provider)
    } else {
      farmDaoContract = new ethers.Contract(farmdaoContractAddress, farmDaoAbi, provider); 
      marketplaceContract = new ethers.Contract(marketplaceContractAddress, marketplaceAbi, provider);
      // priceFeed = new ethers.Contract(aggregatorV3InterfaceAddress, aggregatorAbi, aggregatorProvider); 
      priceConsumer = new ethers.Contract(priceConsumerV3Address, priceConsumerAbi, priceConsumerProvider); 
    }

    return { farmDaoContract, marketplaceContract, priceConsumer }
  } catch (error) {
    console.error(error)
  }
}

export default getProviderOrSigner; 
