import express from 'express';
import { OneInchService } from '../services/oneinch';

const router = express.Router();
const oneInchService = new OneInchService(process.env.ONEINCH_API_KEY!);

// Create limit order
router.post('/create', async (req, res) => {
  try {
    const order = await oneInchService.createLimitOrder(req.body);
    res.json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get user orders
router.get('/:address', async (req, res) => {
  try {
    // Implementation would fetch orders for the address
    res.json({ orders: [] });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel order
router.delete('/:orderId', async (req, res) => {
  try {
    // Implementation would cancel the order
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;