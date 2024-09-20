import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowNotification(true);
  };

  const handleOkClick = () => {
    setShowNotification(false);
    navigate('/products'); // Navigate to the products page
  };

  return (
    <div className="p-5 font-averia flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 uppercase">Fill the form to make your Order</h1>
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Second Name */}
          <div className="mb-4">
            <label htmlFor="second-name" className="block text-sm font-medium text-gray-700">Second Name</label>
            <input
              type="text"
              id="second-name"
              name="second-name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Number of Packets */}
          <div className="mb-4">
            <label htmlFor="packets" className="block text-sm font-medium text-gray-700">Number of Packets</label>
            <input
              type="number"
              id="packets"
              name="packets"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
      
      {/* Notification Box */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4 text-lg font-semibold">Order placed successfully <br /> Payment details have been sent to your email</p>
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
}

export default Order;
