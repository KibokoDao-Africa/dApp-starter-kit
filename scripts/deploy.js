const { ethers } = require("hardhat");
const hre = require("hardhat"); 

const main = async () => {
  // Get deployer address and log it 
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contract with the account: ", deployer.address);
  
  // Get contract factory and deploy the contract
  const contractFactory = await ethers.getContractFactory("SimpleStorage"); 
  const simpleStorage = await contractFactory.deploy(); 
  await simpleStorage.deployed(); 

  console.log("SimpleStorage contract address: ", simpleStorage.address); 

  // Save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(simpleStorage); 

}

const saveFrontendFiles = (simpleStorage) => {
  const fs = require("fs"); 
  const contractsDir = __dirname + "/../frontend/src/contracts"; 

  if(!fs.existsSync(contractsDir)){
    fs.mkdirSync(contractsDir)
  }

  fs.writeFileSync(
    contractsDir + '/contracts-address.json', 
    JSON.stringify({ SimpleStorage: simpleStorage.address }, undefined, 2)
  ); 

  const SimpleStorageArtifact = hre.artifacts.readArtifactSync("SimpleStorage"); 

  fs.writeFileSync(
    contractsDir + '/SimpleStorage.json', 
    JSON.stringify(SimpleStorageArtifact, null, 2)
  ); 

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});