import '@/styles/globals.css';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

import { wagmiConfig } from '../config/wagmi';

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading DeFi Suite...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: any) {
  return (
    <ClientOnly>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={new QueryClient()}>
          <Component {...pageProps} />
          <Toaster position="bottom-right" />
        </QueryClientProvider>
      </WagmiConfig>
    </ClientOnly>
  );
}