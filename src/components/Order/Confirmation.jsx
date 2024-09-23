// src/components/Order/Confirmation.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { order } = location.state;

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Order Number: {order.orderNumber}</p>
      <p>Name: {order.name}</p>
      <p>Email: {order.email}</p>
      <p>Product: {order.product}</p>
      <p>Quantity: {order.quantity}</p>
    </div>
  );
};

export default Confirmation;
