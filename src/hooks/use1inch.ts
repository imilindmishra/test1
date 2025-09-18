import { useState, useCallback } from 'react';
import axios from 'axios';

interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  protocols: any[];
  estimatedGas: string;
}

interface SwapParams {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromAddress: string;
  slippage?: number;
}

export function use1inch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuote = useCallback(async (params: SwapParams): Promise<SwapQuote | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/1inch/quote', { params });
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get quote');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const executeSwap = useCallback(async (params: SwapParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/1inch/swap', params);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to execute swap');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getFusionQuote = useCallback(async (params: SwapParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/1inch/fusion/quote', params);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get Fusion quote');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getQuote,
    executeSwap,
    getFusionQuote,
    loading,
    error
  };
}