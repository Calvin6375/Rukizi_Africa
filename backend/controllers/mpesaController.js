import dotenv from 'dotenv';
import IntaSend from 'intasend-node'; // Make sure you have installed: npm install intasend-node

dotenv.config();

const intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY,
  process.env.INTASEND_SECRET_KEY,
  process.env.INTASEND_TEST === 'true'
);

export const initiateMpesaStkPush = async (req, res) => {
  const { phone_number, amount } = req.body; // match the JSON body exactly

  console.log('===== M-Pesa STK Push Request Received =====');
  console.log('Request headers:', JSON.stringify(req.headers, null, 2));
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    let collection = intasend.collection();

    const apiBaseUrl =
      process.env.INTASEND_TEST === 'true'
        ? process.env.MPESA_API_URL_SANDBOX
        : process.env.MPESA_API_URL_LIVE;

    console.log('Sending request to base URL:', apiBaseUrl);
    console.log('INTASEND_PUBLISHABLE_KEY:', process.env.INTASEND_PUBLISHABLE_KEY);
    console.log('INTASEND_SECRET_KEY:', process.env.INTASEND_SECRET_KEY);
    console.log('INTASEND_TEST:', process.env.INTASEND_TEST);

    const response = await collection.mpesaStkPush({
      amount: amount.toString(),
      phone_number: phone_number.toString(), // correct key
      host: apiBaseUrl,
      callback_url: process.env.MPESA_CALLBACK_URL,
    });

    console.log('===== Raw response from IntaSend API =====');
    console.dir(response, { depth: null, colors: true });

    if (response.status === 'success') {
      return res.status(200).json({
        message: 'M-Pesa STK Push initiated successfully',
        data: response,
      });
    } else {
      console.error('M-Pesa STK Push initiation failed:', JSON.stringify(response, null, 2));
      return res.status(400).json({
        message: 'M-Pesa STK Push initiation failed',
        error: response,
      });
    }
  } catch (error) {
    console.error('===== Error initiating M-Pesa STK Push =====');
    console.dir(error, { depth: null, colors: true });

    // Handle API errors more clearly
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', JSON.stringify(error.response.headers, null, 2));

      try {
        const body =
          typeof error.response.data === 'string'
            ? JSON.parse(error.response.data)
            : error.response.data;
        console.error('Body:', JSON.stringify(body, null, 2));
      } catch (parseErr) {
        console.error('Raw Body:', error.response.data);
      }
    } else if (error.body) {
      try {
        const body =
          typeof error.body === 'string' ? JSON.parse(error.body) : error.body;
        console.error('Error body:', JSON.stringify(body, null, 2));
      } catch (parseErr) {
        console.error('Raw Error body:', error.body);
      }
    } else {
      console.error('Error message:', error.message);
    }

    return res.status(500).json({
      message: 'Server error',
      error:
        error.response?.data ||
        error.response?.body ||
        error.message,
    });
  }
};
