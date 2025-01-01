import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../context/CartContext"; // Import CartContext

const Cart = () => {
  const { cart, setCart } = useContext(CartContext); // Get cart from context and setCart to update
  const [paymentMethod, setPaymentMethod] = useState("Mpesa"); // Default payment method
  const navigate = useNavigate(); // Get the navigate function

  // Function to handle quantity update
  const updateQuantity = (index, type) => {
    const updatedCart = [...cart];
    if (type === "increase") {
      updatedCart[index].quantity += 1;
    } else if (type === "decrease" && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCart(updatedCart); // Update the cart state with the new quantity
  };

  // Ensure that the quantity is a number, and calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = Number(item.quantity) || 1; // Ensure quantity is a valid number or default to 1
      return total + 1000 * quantity; // Price per product is 1000 KES
    }, 0);
  };

  // Function to handle checkout
  const handleCheckout = () => {
    const total = calculateTotal(); // Get the total value
    const currency = "KES"; // Set the currency

    if (paymentMethod === "Mpesa") {
      navigate('/payment/mpesa', { state: { total } }); // Pass total in state
    } else if (paymentMethod === "Bank Card") {
      navigate('/payment/card', { state: { total, currency } }); // Pass total and currency in state
    } else if (paymentMethod === "Paypal") {
      navigate('/payment/paypal');
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 pt-12 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-center pb-10 uppercase font-averia">
          Your Cart
        </h1>

        {/* Cart Items */}
        <div className="grid grid-cols-1 gap-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl px-4 py-2 shadow-[0_0_22px_0_rgba(0,0,0,0.15)] flex items-center gap-3"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-[50px] self-center"
                />
                <div className="flex-grow">
                  <h1 className="text-lg font-semibold font-averia">{item.title}</h1>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-md text-gray-600">Price: Ksh 1000</p>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-4 ml-auto">
                  <button
                    onClick={() => updateQuantity(index, "decrease")}
                    className="bg-gray-300 text-lg rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity || 1}</span> {/* Default to 1 if quantity is not set */}
                  <button
                    onClick={() => updateQuantity(index, "increase")}
                    className="bg-gray-300 text-lg rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-center text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Total Price */}
        <div className="mt-8 text -right">
          <p className="text-xl font-semibold">Total: Ksh {calculateTotal()}</p>
        </div>

        {/* Payment Method Dropdown */}
        <div className="mt-8">
          <label htmlFor="payment-method" className="block text-lg font-semibold">
            Select Payment Method:
          </label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-2 p-2 border rounded-md w-full"
          >
            <option value="Mpesa">Mpesa</option>
            <option value="Bank Card">Bank Card</option>
            <option value="Paypal">Paypal</option>
          </select>
        </div>

        {/* Checkout Button */}
        <div className="mt-8">
          <button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;