import { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  type: string;
  timestamp: number;
  value?: string;
  token?: string;
}

export function TransactionMonitor() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Mock transactions for demonstration
    const mockTransactions: Transaction[] = [
      {
        hash: '0x1234...5678',
        status: 'confirmed',
        type: '1inch Swap',
        timestamp: Date.now() - 300000,
        value: '1.5 ETH → 3000 USDC'
      },
      {
        hash: '0xabcd...efgh',
        status: 'pending',
        type: 'Fusion Swap',
        timestamp: Date.now() - 60000,
        value: '500 USDC → 0.25 ETH'
      }
    ];
    setTransactions(mockTransactions);
  }, []);

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
    }
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No transactions yet
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.hash} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                {getStatusIcon(tx.status)}
                <div className="ml-3">
                  <div className="font-medium">{tx.type}</div>
                  <div className="text-sm text-gray-500">{tx.value}</div>
                  <div className="text-xs text-gray-400">{tx.hash}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{getStatusText(tx.status)}</div>
                <div className="text-xs text-gray-500">{formatTime(tx.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}