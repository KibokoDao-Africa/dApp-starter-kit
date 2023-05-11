# dApp Starter Kit

Welcome! 

This is a starter kit for building decentralized applications (dApps) using Solidity smart contracts and React.js frontend. 

It provides a basic setup for building, testing, and deploying your dApp.

The starter kit includes a sample smart contract written in Solidity, a React.js frontend, and a Hardhat configuration for deploying to the Ethereum test networks (The sample contract is deployed in mumbai testnet). 

It also includes scripts for compiling, deploying, and testing your dApp.

Whether you're a beginner or an experienced developer, this starter kit provides a solid foundation for building your next dApp. Get started quickly with our easy-to-use setup, or customize it to fit your specific needs.

Happy coding!

# Getting started: 

Run the following commands:

`git clone https://github.com/Stephen-Kimoi/dApp-starter-kit.git` 

`cd dApp-starter-kit` & `npm install` 

`cd frontend` & `npm install` 

`npm run dev`  


## File structure 
This is the file structure: 
```
dapp-starter-kit/
├── contracts/
│   ├── SimpleStorage.sol
├── frontend/
│   ├── public/
│   │   ├── logo.png
│   └── src/
│        ├── assets
│        ├── components/ 
│        │    ├── ConnectWalletModal/ 
│        │    │    ├── ConnectWalletModal.css 
│        │    │    ├── ConnectWalletModal.jsx
│        │    │    ├── RenderConnectors.jsx
│        │    ├── Header/ 
│        │    │   ├── Header.css 
│        │    │   ├── Header.jsx 
│        │    ├── Navbar/ 
│        │    │   ├──  Navbar.css
│        │    │   ├── Navbar.jsx
│        ├── ContractInstance/ 
│        │    ├── ContractInstance.js
│        ├── contracts/ 
│        │    ├── contract-address.json 
│        │    ├── SimpleStorage.json 
│        ├── WalletFunctionalities/ 
│        │    ├── WagmiWallet.js 
│        ├── App.css
│        ├── App.jsx
│        ├── index.css 
│        ├── main.jsx
├── scripts/ 
│   ├── deploy.js 
├── test/
│   └── SimpleStorage.js 
├── hardhat.config.js
├── package.json
└── README.md 
``` 

Sample contract is found in `contracts/SimpleStorage.sol`

The deploy script is found in `scripts/deploy.js` 

### NB: You do not need to manualy copy paste the contract ABI and address when you run the deploy script, the `saveFrontendFiles` function inside the `deploy.js` script automatically creates a folder named `contracts` inside the `frontend/src` directory which contains: 
```
├── contracts/ 
    ├── contract-address.json - contains contract address 
    ├── SimpleStorage.json - contains contract ABI
``` 

The command for running the deploy script is: 
`npm run deployTestnet` (check out package.json in the main directory)

This command deploys the contract to `mumbai testnet` 




