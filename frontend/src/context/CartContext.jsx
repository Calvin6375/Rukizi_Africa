import React, { createContext, useState, useContext } from "react";

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0); // New state for tracking item count

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      // Product already in the cart, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // New product, add to the cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartCount(prevCount => prevCount + 1); // Increment cart count
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    const removedProduct = cart.find(item => item.id === productId);
    if (removedProduct) {
      setCartCount(prevCount => Math.max(0, prevCount - removedProduct.quantity)); // Decrease cart count, ensuring it doesn't go below 0
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
