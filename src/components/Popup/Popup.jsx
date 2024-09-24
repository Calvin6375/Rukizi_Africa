import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Popup = () => {
  const navigate = useNavigate(); // Create navigate function
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

  const handleClose = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg shadow-lg z-50 w-96">
        <form onSubmit={handleSubmit}>
          <label htmlFor="orderNumber" className="block text-gray-700 font-bold mb-2">
            Enter order number (Has been sent to your email)
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
          <div className="flex justify-between">
            <button 
              type="submit" 
              className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
              Submit
            </button>
            <button 
              type="button" 
              onClick={handleClose} // This will navigate to the home page
              className="ml-2 w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-700">
              Close
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </>
  );
};

export default Popup;
