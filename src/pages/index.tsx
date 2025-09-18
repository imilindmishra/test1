import { useState } from 'react';
import Head from 'next/head';

import { WalletConnector } from '../components/WalletConnector';
import { TokenSelector } from '../components/TokenSelector';
import { SwapInterface } from '../components/SwapInterface';
import { LimitOrderInterface } from '../components/LimitOrderInterface';
import { PortfolioTracker } from '../components/PortfolioTracker';

export default function Home() {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <>
      <Head>
        <title>My1inchDeFiSuite - 1inch-Powered DeFi Suite</title>
        <meta name="description" content="Complete DeFi application with 1inch protocol integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    My1inchDeFiSuite
                  </h1>
                  <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                    Powered by 1inch
                  </span>
                </div>
                
                <div className="flex items-center">
                  <WalletConnector />
                </div>
              </div>
            </div>
          </header>

          {/* Navigation */}
          <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-8">
                
                <button
                  onClick={() => setActiveTab('swap')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'swap'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  🔄 Swap
                </button>
                
                <button
                  onClick={() => setActiveTab('limit')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'limit'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  📝 Limit Orders
                </button>
                
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'portfolio'
                      ? 'border-blue-500 text-blue-60
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  📊 Portfolio
                </button>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {activeTab === 'swap' && (
                <div className="max-w-md mx-auto">
                  <SwapInterface />
                </div>
              )}
              
              {activeTab === 'limit' && (
                <div className="max-w-md mx-auto">
                  <LimitOrderInterface />
                </div>
              )}
              
              {activeTab === 'portfolio' && (
                <div className="max-w-4xl mx-auto">
                  <PortfolioTracker />
                </div>
              )}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-50 border-t">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                Built with Unite DeFi Platform • Powered by 1inch Protocol
              </p>
            </div>
          </footer>
        </div>
    </>
  );
}