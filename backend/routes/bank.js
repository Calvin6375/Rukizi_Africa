import express from 'express';
import { initiateBankPayment } from '../controllers/bankController.js';

const router = express.Router();

// This route will handle POST requests to /api/payments/bank
router.post('/', initiateBankPayment); // Change to '/' to match the base route

export default router;