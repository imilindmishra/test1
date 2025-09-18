import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface TokenBalance {
  symbol: string;
  balance: string;
  valueUSD: number;
  address: string;
}

export function PortfolioTracker() {
  const { address, isConnected } = useAccount();
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (isConnected && address) {
      fetchPortfolioData();
    }
  }, [isConnected, address]);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration
      const mockBalances: TokenBalance[] = [
        { symbol: 'ETH', balance: '2.5', valueUSD: 5000, address: '0x...' },
        { symbol: 'USDC', balance: '1000', valueUSD: 1000, address: '0x...' },
        { symbol: '1INCH', balance: '500', valueUSD: 250, address: '0x...' }
      ];
      setBalances(mockBalances);
      setTotalValue(mockBalances.reduce((sum, token) => sum + token.valueUSD, 0));
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Portfolio Tracker</h2>
        <p className="text-gray-500">Connect your wallet to view your portfolio</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Portfolio</h2>
        <button
          onClick={fetchPortfolioData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900">
          ${totalValue.toLocaleString()}
        </div>
        <div className="text-gray-500">Total Portfolio Value</div>
      </div>

      <div className="space-y-3">
        {balances.map((token) => (
          <div key={token.address} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <div className="font-medium">{token.symbol}</div>
                <div className="text-sm text-gray-500">{token.balance}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">${token.valueUSD.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}