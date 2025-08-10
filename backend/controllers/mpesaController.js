import dotenv from 'dotenv';
import IntaSend from 'intasend-node'; // npm install intasend-node

dotenv.config();

const intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY,
  process.env.INTASEND_SECRET_KEY,
  process.env.INTASEND_TEST === 'true'
);

export const initiateMpesaStkPush = async (req, res) => {
  const { phone_number, amount } = req.body; // Must match JSON body keys

  console.log('===== M-Pesa STK Push Request Received =====');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));

  try {
    let collection = intasend.collection();

    const response = await collection.mpesaStkPush({
      amount: amount.toString(),
      phone_number: phone_number.toString(), // Required by IntaSend
      currency: 'KES', // IntaSend expects currency
      callback_url: process.env.MPESA_CALLBACK_URL
    });

    console.log('===== IntaSend Response =====');
    console.dir(response, { depth: null, colors: true });

    if (response.status === 'success') {
      return res.status(200).json({
        message: 'M-Pesa STK Push initiated successfully',
        data: response
      });
    } else {
      console.error('M-Pesa STK Push initiation failed:', JSON.stringify(response, null, 2));
      return res.status(400).json({
        message: 'M-Pesa STK Push initiation failed',
        error: response
      });
    }
  } catch (error) {
    console.error('===== Error initiating M-Pesa STK Push =====');
    console.dir(error, { depth: null, colors: true });

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', JSON.stringify(error.response.headers, null, 2));
      console.error('Body:', JSON.stringify(error.response.data, null, 2));
    } else if (error.body) {
      console.error('Error body:', JSON.stringify(error.body, null, 2));
    } else {
      console.error('Error message:', error.message);
    }

    return res.status(500).json({
      message: 'Server error',
      error: error.response?.data || error.body || error.message
    });
  }
};
