import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mpesaRoutes from './routes/mpesa.js';
import bankRoutes from './routes/bank.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/api/payments', mpesaRoutes);
app.use('/api/payments/bank', bankRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});