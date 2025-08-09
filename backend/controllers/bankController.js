import IntaSend from 'intasend-node';
import dotenv from 'dotenv';

dotenv.config();

const intasend = new IntaSend(
    process.env.INTASEND_PUBLISHABLE_KEY,
    process.env.INTASEND_SECRET_KEY,
    process.env.INTASEND_TEST === 'true'  // Use env var to toggle test/live
);

export const initiateBankPayment = async (req, res) => {
    console.log('===== Bank Payment Request Received =====');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { first_name, last_name, email, phone_number, amount, currency, redirect_url } = req.body;

    try {
        const apiBaseUrl = process.env.INTASEND_TEST === 'true'
            ? process.env.MPESA_API_URL_SANDBOX
            : process.env.MPESA_API_URL_LIVE;

        const payload = {
            first_name,
            last_name,
            email,
            phone_number,
            amount: amount.toString(),
            currency,
            redirect_url,
            host: apiBaseUrl,                     // Use the correct host based on env
            api_ref: `payment_${Date.now()}`,    // Unique transaction reference
            method: 'CARD-PAYMENT',               // Payment method (you can customize)
            callback_url: process.env.BANK_CALLBACK_URL,  // Add callback URL here
        };

        console.log('Payload for IntaSend charge:', JSON.stringify(payload, null, 2));

        const response = await intasend.collection().charge(payload);

        console.log('===== IntaSend Bank Payment Charge Response =====');
        console.log(JSON.stringify(response, null, 2));

        // Return the checkout URL or full response based on SDK
        res.status(200).json({ url: response.url || response.checkout_url || null, data: response });
    } catch (error) {
        if (error.response) {
            console.error('Error response from IntaSend API:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error initiating bank payment:', error.message);
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const bankCallbackHandler = (req, res) => {
    console.log('===== Bank Payment Callback Received =====');
    console.log('Callback body:', JSON.stringify(req.body, null, 2));

    // TODO: validate & process callback data here (update DB/orders/payment status)

    res.status(200).json({ message: 'Bank callback received' });
};
