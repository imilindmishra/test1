import express from 'express';
import { OneInchService } from '../services/oneinch';

const router = express.Router();
const oneInchService = new OneInchService(process.env.ONEINCH_API_KEY!);

// Get portfolio data
router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const { chainId } = req.query;
    
    const portfolio = await oneInchService.getPortfolio(address, Number(chainId) || 1);
    res.json(portfolio);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get transaction history
router.get('/:address/history', async (req, res) => {
  try {
    const { address } = req.params;
    // Implementation would fetch transaction history
    res.json({ transactions: [] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;