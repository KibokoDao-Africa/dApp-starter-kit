import { createClient, configureChains } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import config from '../../config'

const alchemyRpcProvider = config.rpcProvider; 

const { chains, provider , webSocketProvider } = configureChains(
    [polygonMumbai],
    [alchemyProvider({ apiKey: alchemyRpcProvider }), publicProvider()],
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