import express from 'express';
import { initiateBankPayment, bankCallbackHandler } from '../controllers/bankController.js';

const router = express.Router();

// POST /api/payments/bank to initiate bank payment
router.post('/', initiateBankPayment);

// POST /api/payments/bank/callback to handle payment callbacks from IntaSend
router.post('/callback', bankCallbackHandler);

export default router;
