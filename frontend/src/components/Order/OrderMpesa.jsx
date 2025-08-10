import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';

const OrderMpesa = () => {
  const { state } = useLocation(); // Get state from navigate
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const total = state?.total || 0; // Get the total value from state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      firstName,
      lastName,
      phoneNumber,
      email,
      to_name: `${firstName} ${lastName}`,
    };

    setLoading(true);
    setErrorMessage('');
    setPaymentStatus('');

    try {
      // Send email using emailjs
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Use the environment variable
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Use the environment variable
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID // Use the environment variable
      );
      console.log('Email sent successfully');

      // Send payment initiation request to the backend
      const response = await fetch('https://rukizi-backend.onrender.com/api/payments/mpesa', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          amount: total // Ensure this matches the backend expected field
        })
      });
      console.log('Payment initiation request sent to backend');


      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to initiate payment');
      }

      const data = await response.json();
      console.log('Payment initiated successfully:', data);

      // Check the payment state
      if (data.invoice.state === 'PENDING') {
        setPaymentStatus('Payment is being processed. Please check your email for further instructions.');
      } else {
        alert('Payment initiated successfully. Payment details have been sent to your email!');
      }
    } catch (error) {
      console.error('Failed to send email or initiate payment:', error);
      setErrorMessage('Please enter your pin on your phone.');
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 pt-8 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center pb-8 uppercase font-averia">
          Mpesa Payment
        </h1>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number (254xxxxxx)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} // Corrected here
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Display the total amount */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Amount</label>
            <input
              type="text"
              value={`Ksh ${total}`}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            />
          </div>

          {loading && <div className="text-blue-500">Sending payment details, please wait...</div>}
          {paymentStatus && <div className="text-blue-500 mt-4">{paymentStatus}</div>}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay'}
            </button>
          </div>
          {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
        </form>
      </div>
    </section>
  );
};

export default OrderMpesa;