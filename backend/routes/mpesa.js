import express from 'express';
import { initiateMpesaStkPush, mpesaCallbackHandler } from '../controllers/mpesaController.js';

const router = express.Router();

router.post('/mpesa', initiateMpesaStkPush);
router.post('/mpesa/callback', mpesaCallbackHandler);

export default router;
