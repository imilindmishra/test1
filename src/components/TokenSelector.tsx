import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
}

interface TokenSelectorProps {
  selectedToken?: Token;
  onTokenSelect: (token: Token) => void;
  label?: string;
}

const POPULAR_TOKENS: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', decimals: 18 },
  { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86a33E6441fb3cD7b2a9da94C2b48A8aE5fF0', decimals: 6 },
  { symbol: 'USDT', name: 'Tether USD', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', decimals: 8 },
  { symbol: '1INCH', name: '1inch Token', address: '0x111111111117dC0aa78b770fA6A738034120C302', decimals: 18 }
];

export function TokenSelector({ selectedToken, onTokenSelect, label = "Select Token" }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = POPULAR_TOKENS.filter(token =>
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
      >
        <div className="flex items-center">
          {selectedToken ? (
            <>
              <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
              <span className="font-medium">{selectedToken.symbol}</span>
              <span className="text-gray-500 ml-1">{selectedToken.name}</span>
            </>
          ) : (
            <span className="text-gray-500">Select a token</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-3 border-b">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.address}
                onClick={() => {
                  onTokenSelect(token);
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
              >
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}