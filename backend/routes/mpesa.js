import express from 'express';
import { initiateMpesaStkPush } from '../controllers/mpesaController.js';

const router = express.Router();

// Define the route for M-Pesa STK Push
router.post('/mpesa', initiateMpesaStkPush);

export default router;