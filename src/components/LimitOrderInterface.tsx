import { useState } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

export function LimitOrderInterface() {
  const { address, isConnected } = useAccount();
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateOrder = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }

    setLoading(true);
    try {
      // Implement limit order creation logic here
      toast.success('Limit order created successfully!');
    } catch (error) {
      toast.error('Failed to create limit order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Limit Order</h2>
        <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
          1inch Protocol
        </div>
      </div>

      <div className="space-y-4">
        {/* Sell Token */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">You sell</span>
            <span className="text-sm text-gray-500">Balance: 0.00</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
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

        {/* Buy Token */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">You buy</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="0.0"
              className="text-2xl font-medium bg-transparent outline-none w-full"
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

        {/* Create Order Button */}
        <button
          onClick={handleCreateOrder}
          disabled={!isConnected || loading || !sellAmount || !buyAmount}
          className="w-full bg-purple-500 text-white py-4 rounded-lg font-medium hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Order...' : !isConnected ? 'Connect Wallet' : 'Create Limit Order'}
        </button>
      </div>
    </div>
  );
}