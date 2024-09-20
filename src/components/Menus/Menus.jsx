import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Flavor1 from "../../assets/nuts/salted.png";
import Flavor2 from "../../assets/nuts/plain.png";
import Flavor3 from "../../assets/nuts/chilled.png";
import Flavor4 from "../../assets/nuts/honey.png";
import { motion } from "framer-motion";
import { FadeLeft } from "../../utility/animations";
import { IoBagHandleOutline } from "react-icons/io5"; // Make sure to import the icon

const MenusData = [
    {
        id: 1,
        title: "Roasted & salted",
        link: "/",
        img: Flavor1,
        delay: 0.3,
    },
    {
        id: 2,
        title: "Roasted plain",
        link: "/",
        img: Flavor2,
        delay: 0.6,
    },
    {
        id: 3,
        title: "Roasted & chillied",
        link: "/",
        img: Flavor3,
        delay: 0.9,
    },
    {
        id: 4,
        title: "Honey coated",
        link: "/",
        img: Flavor4,
        delay: 1.2,
    },
];

const Menus = () => {
  const navigate = useNavigate(); // Create navigate function

  const handleOrderClick = () => {
    navigate('/order'); // Navigate to the order page
  };

  return (
    <section className="100 py-12">
      <div className="container mx-auto px-4 pt-12 pb-20 flex flex-wrap justify-around gap-4 ">
        <motion.h1
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl font-bold text-left pb-10 uppercase font-averia"
        >
          Our Products
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20 ">
          {MenusData.map((menu) => (
            <motion.div
              key={menu.id}
              variants={FadeLeft(menu.delay)}
              initial="hidden"
              whileInView={"visible"}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-3xl px-4 py-2 shadow-[0_0_22px_0_rgba(0,0,0,0.15)] flex flex-col justify-center items-center gap-3 w-64"
            >
              <img 
                src={menu.img}
                alt="" 
                className="w-[100px] self-center"
              />
              <div>
                <h1 className="text-lg font-semibold font-averia">{menu.title}</h1>
              </div>
            </motion.div>   
          ))}
        </div>
        {/* New text tile */}
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold font-averia">
            Any flavor for Kes 1000 each
          </h2>
          {/* Button section */}
          <motion.div 
            variants={FadeLeft(1.5)}
            initial="hidden"
            whileInView="visible"
            className="flex justify-center mt-4"
          >
            <button 
              className="primary-btn flex items-center gap-2" 
              onClick={handleOrderClick} // Add onClick event
            >
              <span>
                <IoBagHandleOutline />
              </span>
              Order Now
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Menus;
