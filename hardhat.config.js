require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {}, 
    polygon_mumbai: {
      url: process.env.ALCHEMY_API_KEY, 
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};