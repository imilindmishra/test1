import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export function WalletConnector() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showOptions, setShowOptions] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: Log available connectors
  useEffect(() => {
    if (mounted) {
      console.log('Available connectors:', connectors);
      console.log('Connector names:', connectors.map(c => ({ id: c.id, name: c.name, ready: c.ready })));
    }
  }, [connectors, mounted]);

  const handleConnect = (connector: any) => {
    console.log('Attempting to connect with:', connector);
    connect({ connector });
    setShowOptions(false);
  };

  // Show loading state during SSR
  if (!mounted) {
    return (
      <div className="w-full px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium">
        Loading...
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
        <div className="flex-1">
          <p className="text-sm text-green-600">Connected</p>
          <p className="text-xs text-green-500 font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const availableConnectors = connectors.filter(connector => connector.ready);

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isConnecting}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isConnecting ? 'Connecting...' : `Connect Wallet (${availableConnectors.length} available)`}
      </button>
      
      {showOptions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2">
            {availableConnectors.length > 0 ? (
              availableConnectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => handleConnect(connector)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span className="font-medium">{connector.name}</span>
                  <span className="text-xs text-gray-500">({connector.id})</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No wallets available. Please install MetaMask or another wallet extension.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}