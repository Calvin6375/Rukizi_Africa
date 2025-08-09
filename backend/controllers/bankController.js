import IntaSend from 'intasend-node'; // Import the IntaSend SDK

// Initialize IntaSend with your production keys
const intasend = new IntaSend(
    process.env.INSTASEND_PUBLISHABLE_KEY, // Your publishable key
    process.env.INSTASEND_SECRET_KEY, // Your secret key
    false // Set to false for production environment (true for test environment)
);

// Example logic for bank payment initiation
export const initiateBankPayment = async (req, res) => {
    const { first_name, last_name, email, phone_number, amount, currency, redirect_url } = req.body;
    console.log('Received bank payment request:', req.body);

    try {
        // Prepare the payload for the IntaSend API
        const payload = {
            first_name,
            last_name,
            email,
            phone_number,
            amount: amount.toString(), // Ensure amount is a string
            currency,
            redirect_url,
            host: 'https://yourwebsite.com', // Replace with your actual host
            api_ref: 'patment_1', // Optional reference for your transaction
            method: 'CARD-PAYMENT' // Specify the payment method
        };

        // Log the payload for debugging
        console.log('Payload:', payload);

        // Call the IntaSend API to create a checkout link
        const response = await intasend.collection().charge(payload);

        // Log the response from the IntaSend API
        console.log('Charge Response:', response);

        // Return the checkout URL to the frontend
        res.status(200).json({ url: response.url }); // Adjust based on the actual response structure
    } catch (error) {
        console.error('Error initiating bank payment:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const bankCallbackHandler = (req, res) => {
  // IntaSend will POST bank payment result here
  console.log('Bank Payment Callback received:', req.body);

  // Handle updating database/order/payment status here

  res.status(200).json({ message: 'Bank callback received' });
};
