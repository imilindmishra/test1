import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useConnectors } from 'wagmi';

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const connectors = useConnectors();

  const connectWallet = (connectorId?: string) => {
    const connector = connectorId 
      ? connectors.find(c => c.id === connectorId)
      : connectors[0];
    
    if (connector) {
      connect({ connector });
    }
  };

  return {
    address,
    isConnected,
    isConnecting,
    connect: connectWallet,
    disconnect,
    connectors
  };
}