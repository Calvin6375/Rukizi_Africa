import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Menus from './components/Menus/Menus';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import Contacts from './components/Contacts/Contacts';
import Cart from './components/cart/Cart';
import OrderMpesa from './components/Order/OrderMpesa';
import OrderCard from './components/Order/OrderCard';
import OrderPaypal from './components/Order/OrderPaypal';
import { CartProvider } from "./context/CartContext";


const App = () => {
  const [cartBlink, setCartBlink] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Navbar cartBlink={cartBlink} />
        <main className="overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/menus" element={<Menus setCartBlink={setCartBlink} />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment/mpesa" element={<OrderMpesa />} />
            <Route path="/payment/card" element={<OrderCard />} />
            <Route path="/payment/paypal" element={<OrderPaypal />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </CartProvider>
  );
};

export default App;
