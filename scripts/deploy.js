const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () => {
  // Get deployer address and log it
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account: ", deployer.address);

  // Get contract factory and deploy the contract
  const contractFactory = await ethers.getContractFactory("Counter"); // Use "Counter" instead of "SimpleStorage"
  const counter = await contractFactory.deploy();
  await counter.deployed();

  console.log("Counter contract address: ", counter.address);

  // Save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(counter);
};

const saveFrontendFiles = (counter) => {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + '/contracts-address.json',
    JSON.stringify({ Counter: counter.address }, undefined, 2)
  );

  const CounterArtifact = hre.artifacts.readArtifactSync("Counter");

  fs.writeFileSync(
    contractsDir + '/Counter.json',
    JSON.stringify(CounterArtifact, null, 2)
  );
};

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});