import IntaSend from 'intasend-node';
import dotenv from 'dotenv';

dotenv.config();

const intasend = new IntaSend(
    process.env.INTASEND_PUBLISHABLE_KEY,
    process.env.INTASEND_SECRET_KEY,
    process.env.INTASEND_TEST === 'true'
);

export const initiateMpesaStkPush = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, amount } = req.body;
    
    console.log('===== M-Pesa STK Push Request Received =====');
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    try {
        let collection = intasend.collection();

        const apiBaseUrl = process.env.INTASEND_TEST === 'true'
            ? process.env.MPESA_API_URL_SANDBOX
            : process.env.MPESA_API_URL_LIVE;

        console.log('Sending request to base URL:', apiBaseUrl);

        const response = await collection.mpesaStkPush({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            amount: amount,   // corrected to totalAmount
            api_ref: `order-${Date.now()}`,
            host: apiBaseUrl,
            callback_url: process.env.MPESA_CALLBACK_URL,
        });

        console.log('===== IntaSend M-Pesa STK Push Response =====');
        console.log(JSON.stringify(response, null, 2));

        if (response.status === 'success') {
            res.status(200).json({ message: 'M-Pesa STK Push initiated successfully', data: response });
        } else {
            console.log('M-Pesa STK Push initiation failed:', JSON.stringify(response, null, 2));
            res.status(400).json({ message: 'M-Pesa STK Push initiation failed', error: response });
        }
    } catch (error) {
        if (error.response) {
            console.error('Error response from IntaSend API:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error initiating M-Pesa STK Push:', error.message);
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const mpesaCallbackHandler = (req, res) => {
    console.log('===== M-Pesa Callback Received =====');
    console.log('Callback headers:', JSON.stringify(req.headers, null, 2));
    console.log('Callback body:', JSON.stringify(req.body, null, 2));

    // TODO: validate & process callback data here

    res.status(200).json({ message: 'M-Pesa callback received' });
};
