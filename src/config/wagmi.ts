import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { polygon } from 'wagmi/chains';
import { bsc } from 'wagmi/chains';
import { arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

export const { chains, publicClient } = configureChains(
  [
  mainnet,
  polygon,
  bsc,
  arbitrum
  ],
  [publicProvider()]
);

const connectors = [
  new MetaMaskConnector({
    chains,
    options: {
      shimDisconnect: true,
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c4f79cc821944d9680842e34466bfbd9',
    },
  }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Multi-Chain DeFi Suite',
    },
  }),
];

export const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  connectors,
});