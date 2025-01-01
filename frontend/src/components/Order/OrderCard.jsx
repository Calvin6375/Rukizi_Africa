import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed state

const OrderCard = () => {
  const location = useLocation(); // Get the location object
  const { total, currency } = location.state || { total: 0, currency: 'KES' }; // Get the total and currency from the state passed from the Cart component

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    amount: total, // Set the amount to the total passed from the Cart
    currency: currency, // Set the currency
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      to_name: `${formData.firstName} ${formData.lastName}`
    };

    setLoading(true);
    setErrorMessage('');

    try {
      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Use the environment variable
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Use the environment variable
        emailParams,
        import.meta.env.VITE_EMAILJS_USER_ID // Use the environment variable
      );
      console.log('Email sent successfully');

      // Send the data to the backend to generate a checkout link
      const response = await axios.post('http://localhost:5000/api/payments/bank', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email, // Use the email entered by the user
        phone_number: formData.phoneNumber,
        amount: formData.amount,
        currency: formData.currency,
        method: 'CARD-PAYMENT', // Specify that we want to accept only card payments
        redirect_url: 'http://localhost:5173/payment/card' // Replace with your actual redirect URL
      });

      // Redirect the user to the checkout link
      window.location.href = response.data.url;

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to send email or generate checkout link:', error.message);
      setErrorMessage('Failed to send payment details. Please try again.');
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 pt-12 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center pb-10 uppercase font-averia">
          Bank Card Payment
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-lg font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-lg font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-lg font-semibold">
              Amount (Ksh)
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              className="mt-2 p-2 border rounded-md w-full bg-gray-200" // Make it read-only with a different background
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="currency" className="block text-lg font-semibold">
              Currency
            </label>
            <input
              type="text"
              id="currency"
              name="currency"
              value={formData.currency}
              className="mt-2 p-2 border rounded-md w-full bg-gray-200" // Make it read-only with a different background
              readOnly
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderCard;