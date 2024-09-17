import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero"; 
import Menus from "./components/Menus/Menus";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
  <>
  <main className="overflow-x-hidden">
    <Navbar  />
    <Hero />
    <Menus />
    <Banner />
    <Footer />
  </main>
  </>
  );
};

export default App;
