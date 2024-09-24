import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Menus from './components/Menus/Menus';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import Contacts from './components/Contacts/Contacts';
import Order from './components/Order/Order';
import Popup from './components/Popup/Popup';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify-order" element={<Popup />} /> {/* Add route for Popup */}
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
