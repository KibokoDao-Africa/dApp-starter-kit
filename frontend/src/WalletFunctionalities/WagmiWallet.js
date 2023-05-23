import { createClient, configureChains } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { CoinbaseWalletConnector } from '@wagmi/core/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import config from '../../config'

// const alchemyRpcProvider = config.rpcProvider; 

const { chains, provider , webSocketProvider } = configureChains(
    [polygonMumbai], // Configure whichever chains you would like to use, look at line 2 for the imports
    [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()], // Change the alchemyRpcProvider to your own provider
)

export const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'Decentralized Discord',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: 'Decentralized Discord',
        },
      }),
    ],
    provider,
    webSocketProvider,
})

