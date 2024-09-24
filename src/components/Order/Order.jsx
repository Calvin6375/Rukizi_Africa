import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';

const Order = () => {
  const [showInitialNotification, setShowInitialNotification] = useState(false);
  const [showFinalNotification, setShowFinalNotification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Capture form data
    const formData = {
      name: e.target['name'].value,
      email: e.target['email'].value,
      product: e.target['product'].value,
      quantity: e.target['quantity'].value,
      phoneNumber: e.target['phone-number'].value,
    };

    try {
      // Send order data to the backend
      const response = await axios.post('http://localhost:5000/api/orders', formData);

      // Set order number from response
      const orderNumber = response.data.order_number;

      // Send email using EmailJS
      const emailParams = {
        to_name: formData.name,
        to_email: formData.email,
        order_number: orderNumber,
        payment_link: `http://localhost:5173/verify-order?orderNumber=${orderNumber}&phoneNumber=${formData.phoneNumber}`,
      };

      await emailjs.send('service_yuf9gxv', 'template_4eijm4s', emailParams, 'tzwduOWFuNzBJdNNG');
      console.log('Email successfully sent!');

      // Show initial notification
      setShowInitialNotification(true);
      setTimeout(() => {
        setShowInitialNotification(false);
        setShowFinalNotification(true); // Show the final notification
      }, 3000); // Show initial notification for 3 seconds

      // Navigate to the Popup page
      navigate(`/verify-order?orderNumber=${orderNumber}&phoneNumber=${formData.phoneNumber}`);

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order, please try again.');
    }
  };

  const handleOkClick = () => {
    setShowFinalNotification(false);
    navigate('/products');
  };

  return (
    <div className="p-5 font-averia flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 uppercase">Fill the form to make your Order</h1>
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone-number"
              name="phone-number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Payment Details are sent to here.)</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Product */}
          <div className="mb-4">
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
            <input
              type="text"
              id="product"
              name="product"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue=""
              required
            />
          </div>
          {/* Number of Packets (Quantity) */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Number of Packets</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
      {/* Initial Notification Box */}
      {showInitialNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4 text-lg font-semibold">
              Your order has been placed successfully! <br /> Your order number has been sent to your email, please check your email.
            </p>
          </div>
        </div>
      )}

      {/* Final Notification Box */}
      {showFinalNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4 text-lg font-semibold">
              Order placed successfully! <br /> Payment details have been sent to your email.
            </p>
            <button
              onClick={handleOkClick}
              className="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
