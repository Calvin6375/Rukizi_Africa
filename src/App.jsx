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
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  return (
    <Router>
      <Navbar />
      <main className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/banner" element={<Banner />} /> {/* Example Route */}
          <Route path="/contacts" element={<Contacts />} /> {/* Example Route */}
          <Route path="/order" element={<Order onOrderComplete={handleShowPopup} />} /> {/* Example Route */}
          {/* Add other routes here */}
        </Routes>
        {showPopup && <Popup onClose={handleHidePopup} />}
        <Footer />
      </main>
    </Router>
  );
};
export default App;
