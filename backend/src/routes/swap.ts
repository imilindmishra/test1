import express from 'express';
import { OneInchService } from '../services/oneinch';

const router = express.Router();
const oneInchService = new OneInchService(process.env.ONEINCH_API_KEY!);

// Get swap quote
router.get('/quote', async (req, res) => {
  try {
    const { chainId, src, dst, amount, from, slippage } = req.query;
    
    const quote = await oneInchService.getQuote({
      chainId: Number(chainId),
      src: src as string,
      dst: dst as string,
      amount: amount as string,
      from: from as string,
      slippage: slippage ? Number(slippage) : 1
    });
    
    res.json(quote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Execute swap
router.post('/execute', async (req, res) => {
  try {
    const { chainId, src, dst, amount, from, slippage } = req.body;
    
    const swap = await oneInchService.getSwap({
      chainId,
      src,
      dst,
      amount,
      from,
      slippage: slippage || 1
    });
    
    res.json(swap);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});



export default router;