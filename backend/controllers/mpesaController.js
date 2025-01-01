import IntaSend from 'intasend-node';
import dotenv from 'dotenv';

dotenv.config();

// Initialize IntaSend with your keys
const intasend = new IntaSend(
    process.env.INSTASEND_PUBLISHABLE_KEY,  // Your publishable key
    process.env.INSTASEND_SECRET_KEY,       // Your secret key
    true // Set to true for test environment
);

export const initiateMpesaStkPush = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, totalAmount } = req.body;
    console.log('Received request:', req.body); // Log incoming request

    try {
        // Create a collection instance
        let collection = intasend.collection();

        // Trigger the M-Pesa STK Push
        const response = await collection.mpesaStkPush({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phoneNumber,
            amount: totalAmount,
            api_ref: 'test',  // Reference for the transaction, could be order ID or unique value
            host: 'https://6d6a-102-214-76-34.ngrok-free.app',  // Your website or callback URL for the user to complete the payment
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