# dApp Starter Kit

Welcome! 

This is a starter kit for building decentralized applications (dApps) using Solidity smart contracts and React.js frontend. 

It provides a basic setup for building, testing, and deploying your dApp.

The starter kit includes a sample smart contract written in Solidity, a React.js frontend, and a Hardhat configuration for deploying to the Ethereum test networks (The sample contract is deployed in mumbai testnet). 

It also includes scripts for compiling, deploying, and testing your dApp.

Whether you're a beginner or an experienced developer, this starter kit provides a solid foundation for building your next dApp. Get started quickly with our easy-to-use setup, or customize it to fit your specific needs.

Happy coding!

# Getting started: 
There are 2 branches:
1. Main 
2. metamask-wallet 

`Main`: recommended when building large scalable dApps. Supports coinbase, walletconnect and metamask wallets

`metamask-wallet`: recommended when doing smaller projects, only supports Metamask wallet

## MAIN BRANCH

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

## frontend 
Dependencies: 
`vite` 
`wagmi`   
`coinbase/wallet-sdk`
`usehooks-ts` 
`react-modal` 

When you run `npm run dev` this is the site that you'll see: 

Click on the `connect wallet` button and this pop-up will appear: 

You can now choose any of your preferred wallet providers among the three: 

Once you connet your wallet succesfully this is what you'll see: 

You can write any message and send it to see whether your transaction will be successfull 

### NB: The contract is deployed in `mumbai testnet`, therefore ensure you've switched to mumbai testnet and have some `mumbai matic` to prevent any errors. 

## Functions description:

### Wallet Connection: 
We are using `wagmi` to connect to our wallets. 

The configuration for the different wallet providers you would like to use can be found in `frontend/src/WalletFunctionalities/WagmiWallet.js` 


``` 
├── frontend/ 
│    ... 
│    └── src/ 
│    ... 
│       ├── WalletFunctionalities/ 
│           ├── WagmiWallet.js 
``` 

The wallet providers that have been configured in the project are 3: 
1. `Metamask` 
2. `Coinbase` 
3. `WalletConnect` 

If you'd like to configure other wallet providers check out [Wagmi docs](https://wagmi.sh/examples/connect-wallet#step-1-configuring-connectors)

You need to change the `alchemyRpcProvider` to your own provider in this section:  

```
const { chains, provider , webSocketProvider } = configureChains(
    [polygonMumbai], // Configure whichever chains you would like to use, look at line 2 for the imports
    [alchemyProvider({ apiKey: alchemyRpcProvider }), publicProvider()], // Change the alchemyRpcProvider to your own provider
)

```

You can use [alchemy.com](https://alchemy.com) or [anfura.io](https::/infura.io)

You can also configure which chains you would like to use in the section. Check out the comments. 

### Navbar.jsx 
The file can be located in the `frontend/src/components/Navbar/Navbar.jsx` 

The client exported from the `WagmiWallet.js` is imported in the `Navba.jsx` component. 

File path: 
``` 
├── frontend/ 
│    ... 
│    └── src/ 
│    ... 
│       ├── components/ 
│           ...
│           ├── Navbar
|               ├── Navbar.jsx
``` 
When you click the `connectWallet` button, a modal pop-up containing different wallet providers appears. 

Once you've connected your wallet, 2 buttons appear: 
1. Disconnect - for disconnecting the wallet 
2. Sliced address - contains address of the connected wallet

### ConnectWalletModal.jsx 
This is where the wallet connection takes place. 

The main function for connecting the wallet can be found within the `handleSignUpWithWagmi` function.  

The `renderConnectors` function on line 70 displays the different wallet connectors. 

Once the wallet is connected, the `Header` component appears. 

### Header.jsx 
This is where we call and perform actions to the deployed smart contract. 

We are performing the contract write operation using wagmi. This is because we've used wagmi to connect to the different wallet providers. 

If you'd like to know more about using wagmi to perform contract write operations check their documentation over [here](https://wagmi.sh/examples/contract-write-dynamic)

`usePrepareContractWrite` hook fetches the parameters required for sending a contract write transaction

```
const { config } = usePrepareContractWrite({
    address: SimpleStorage.SimpleStorage, 
    abi: [abi.abi[2]], 
    functionName: 'set', 
    args: [debouncedMessage], 
    enabled: Boolean(debouncedMessage), 
  })
```

In this example, we will be calling the `set` function inside the `SimpleStorage` contract. 

Parameters: 
```
address: takes in the SimpleStorage address imported from /contracts/contracts-address.json

abi: we use the specific import abi.abi[2] since it contains ABI for the `set` function inside the SimpleStorage smart contract. 

If we were to call another function such as `get` we would use the import abi.abi[1] since it contains ABI for the get function. 

functionName: name of the function we are calling 

args: takes in the arguments of the function you're calling. In this case it is the debouncedMessage from the inputMessage 

enabled(optional): it disables the query from automatically running.
```

If you want to dig deeper about `usePrepareContractWrite` hook check out [wagmi's documentation](https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite)

`useContractWrite` hook performs the actual contract write transaction.
We then call the `write` function from it in the `sendInputMessage` function. 
















