// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = 5000;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'rukiziafrica',
  password: process.env.DB_PASSWORD || 'sanso',
  port: process.env.DB_PORT || 5432,
});

app.use(bodyParser.json());

// Endpoint to verify the order number and send STK push
app.post('/verify-order', async (req, res) => {
  const { orderNumber, phoneNumber } = req.body;

  try {
    const result = await pool.query('SELECT * FROM orders WHERE order_number = $1', [orderNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = result.rows[0];

    // Send STK push (this is a placeholder, replace with actual STK push implementation)
    await axios.post('https://api.your-stk-service.com/send', {
      phoneNumber,
      amount: order.amount, // Assuming the amount is stored in the order
      description: 'Order payment',
    });

    res.json({ message: 'STK push sent successfully' });
  } catch (error) {
    console.error('Error verifying order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
