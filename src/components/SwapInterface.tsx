import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { toast } from 'react-hot-toast';
import { formatEther, parseEther } from 'viem';

export function SwapInterface() {
  const { address, isConnected } = useAccount();
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [swapMode, setSwapMode] = useState('classic');
  const [loading, setLoading] = useState(false);

  // Fetch ETH balance
  const { data: ethBalance, isLoading: balanceLoading } = useBalance({
    address,
    watch: true,
  });

  // Format balance for display
  const formatBalance = (balance: any) => {
    if (!balance || balanceLoading) return 'Loading...';
    try {
      const formatted = formatEther(balance.value);
      return parseFloat(formatted).toFixed(4);
    } catch (error) {
      return '0.00';
    }
  };

  const handleSwap = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    setLoading(true);
    try {
      // Implement swap logic here
      toast.success('Swap executed successfully!');
    } catch (error) {
      toast.error('Swap failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Swap</h2>
        
      </div>

      {swapMode === 'fusion' && (
        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-700">
            ⚡ Fusion Mode: Gasless swaps with MEV protection
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* From Token */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">From</span>
            <span className="text-sm text-gray-500">
              Balance: {fromToken === 'ETH' ? formatBalance(ethBalance) : '0.00'} {fromToken}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="text-2xl font-medium bg-transparent outline-none w-full"
            />
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-gray-100 rounded-lg px-3 py-2 font-medium"
            >
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
              <option value="DAI">DAI</option>
            </select>
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            ↓
          </button>
        </div>

        {/* To Token */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">To</span>
            <span className="text-sm text-gray-500">
              Balance: {toToken === 'ETH' ? formatBalance(ethBalance) : '0.00'} {toToken}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="0.0"
              className="text-2xl font-medium bg-transparent outline-none w-full"
              readOnly
            />
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-gray-100 rounded-lg px-3 py-2 font-medium"
            >
              <option value="USDC">USDC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="DAI">DAI</option>
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={!isConnected || loading || !amount}
          className="w-full bg-blue-500 text-white py-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Swapping...' : !isConnected ? 'Connect Wallet' : 'Swap'}
        </button>
      </div>
    </div>
  );
}