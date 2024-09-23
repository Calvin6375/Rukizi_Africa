const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Client
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rukiziafrica',
  password: 'sanso',
  port: 5432,
});

// Order Submission Route
app.post('/api/orders', async (req, res) => {
  const { name, email, product, quantity, phoneNumber } = req.body;

  // Generate an order number (simple example)
  const orderNumber = `${name.substring(0, 3)}${phoneNumber.substring(0, 3)}${Date.now()}`;

  try {
    const result = await pool.query(
      'INSERT INTO orders (name, email, product, quantity, phone, order_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, product, quantity, phoneNumber, orderNumber]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});