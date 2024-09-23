import React, { useState } from 'react';
import axios from 'axios';

const Popup = ({ onClose }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/verify-order', {
        orderNumber,
        phoneNumber,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg z-50">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          Close
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="orderNumber" className="block text-gray-700 font-bold mb-2">
            Enter order number
          </label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            placeholder="Enter order number"
            className="w-full px-3 py-2 mb-4 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
          <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
            Enter phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phone number"
            className="w-full px-3 py-2 mb-4 border rounded border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </>
  );
};

export default Popup;
