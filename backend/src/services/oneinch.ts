import axios from 'axios';

export class OneInchService {
  private apiKey: string;
  private baseUrl = 'https://api.1inch.dev';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getQuote(params: {
    chainId: number;
    src: string;
    dst: string;
    amount: string;
    from?: string;
    slippage?: number;
  }) {
    const response = await axios.get(`${this.baseUrl}/swap/v5.2/${params.chainId}/quote`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
      params
    });
    return response.data;
  }

  async getSwap(params: {
    chainId: number;
    src: string;
    dst: string;
    amount: string;
    from: string;
    slippage?: number;
  }) {
    const response = await axios.get(`${this.baseUrl}/swap/v5.2/${params.chainId}/swap`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
      params
    });
    return response.data;
  }

  async getFusionQuote(params: any) {
    const response = await axios.post(`${this.baseUrl}/fusion/quoter/v1.0/1/quote/receive`, params, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    return response.data;
  }

  async createLimitOrder(params: any) {
    const response = await axios.post(`${this.baseUrl}/orderbook/v3.0/1/limit-order`, params, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    return response.data;
  }

  async getPortfolio(address: string, chainId: number) {
    const response = await axios.get(`${this.baseUrl}/portfolio/portfolio/v4/overview/erc20`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
      params: { addresses: address, chain_id: chainId }
    });
    return response.data;
  }
}