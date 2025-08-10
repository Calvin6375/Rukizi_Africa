import IntaSend from 'intasend-node';
import dotenv from 'dotenv';

dotenv.config();

const intasend = new IntaSend(
    process.env.INTASEND_PUBLISHABLE_KEY,
    process.env.INTASEND_SECRET_KEY,
    process.env.INTASEND_TEST === 'true'
);

export const initiateMpesaStkPush = async (req, res) => {
    const { phone_number, amount } = req.body;  // 'phoneNumber' from the request

    console.log('===== M-Pesa STK Push Request Received =====');
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    try {
        let collection = intasend.collection();

        const apiBaseUrl = process.env.INTASEND_TEST === 'true'
            ? process.env.MPESA_API_URL_SANDBOX
            : process.env.MPESA_API_URL_LIVE;

        console.log('Sending request to base URL:', apiBaseUrl);
        console.log('process.env.INTASEND_PUBLISHABLE_KEY:', process.env.INTASEND_PUBLISHABLE_KEY);
        console.log('process.env.INTASEND_SECRET_KEY:', process.env.INTASEND_SECRET_KEY);
        console.log('process.env.INTASEND_TEST:', process.env.INTASEND_TEST);

        const response = await collection.mpesaStkPush({
            amount: amount.toString(),
            phone_number: phone_number.toString(), // must be snake_case for IntaSend API
            host: apiBaseUrl,
            callback_url: process.env.MPESA_CALLBACK_URL,
        });

        console.log('===== Raw response from IntaSend API =====');
        console.dir(response, { depth: null, colors: true });

        if (response.status === 'success') {
            res.status(200).json({
                message: 'M-Pesa STK Push initiated successfully',
                data: response
            });
        } else {
            console.log('M-Pesa STK Push initiation failed:', JSON.stringify(response, null, 2));
            res.status(400).json({
                message: 'M-Pesa STK Push initiation failed',
                error: response
            });
        }

   } catch (error) {
    console.error('===== Error initiating M-Pesa STK Push =====');

    // Log the raw error object for debugging
    console.dir(error, { depth: null, colors: true });

    if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Headers:', JSON.stringify(error.response.headers, null, 2));

        // Log raw body (works for most HTTP libraries)
        const data = error.response.data || error.response.body;
        console.error('Body:', JSON.stringify(data, null, 2));
    } else if (error.body) {
        console.error('Error body:', JSON.stringify(error.body, null, 2));
    } else {
        console.error('Error message:', error.message);
    }

    res.status(500).json({
        message: 'Server error',
        error: error.response?.data || error.response?.body || error.message
    });
}

};

export const mpesaCallbackHandler = (req, res) => {
    console.log('===== M-Pesa Callback Received =====');
    console.log('Callback headers:', JSON.stringify(req.headers, null, 2));
    console.log('Callback body:', JSON.stringify(req.body, null, 2));

    res.status(200).json({ message: 'M-Pesa callback received' });
};
