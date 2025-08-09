import IntaSend from 'intasend-node';
import dotenv from 'dotenv';

dotenv.config();

// Initialize IntaSend with your keys and environment
const intasend = new IntaSend(
    process.env.INSTASEND_PUBLISHABLE_KEY,  // Your publishable key
    process.env.INSTASEND_SECRET_KEY,       // Your secret key
    process.env.INSTASEND_TEST === 'true'   // Set to true for sandbox, false for live
);

export const initiateMpesaStkPush = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, totalAmount } = req.body;
    console.log('Received request:', req.body); // Log incoming request

    try {
        // Create a collection instance
        let collection = intasend.collection();

        // Determine the correct API base URL (sandbox or live)
        const apiBaseUrl = process.env.INSTASEND_TEST === 'true'
            ? process.env.MPESA_API_URL_SANDBOX
            : process.env.MPESA_API_URL_LIVE;

        // Trigger the M-Pesa STK Push
        const response = await collection.mpesaStkPush({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            amount: totalAmount,
            api_ref: `order-${Date.now()}`,  // Generate a unique reference using timestamp
            host: apiBaseUrl,  // Dynamically use the appropriate base URL for the environment
        });

        console.log('InstaSend response:', response); // Log response from InstaSend API

        // Handle the response from InstaSend API
        if (response.status === 'success') {
            res.status(200).json({ message: 'M-Pesa STK Push initiated successfully', data: response });
        } else {
            res.status(400).json({ message: 'M-Pesa STK Push initiation failed', error: response });
        }
    } catch (error) {
        console.error('Error initiating M-Pesa STK Push:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const mpesaCallbackHandler = (req, res) => {
  // IntaSend will POST payment result here
  console.log('M-Pesa Callback received:', req.body);

  // You can verify and update your database with payment status here
  // Example:
  // const { status, api_ref, amount, phone_number } = req.body;

  // Respond with 200 OK to acknowledge receipt
  res.status(200).json({ message: 'M-Pesa callback received' });
};
