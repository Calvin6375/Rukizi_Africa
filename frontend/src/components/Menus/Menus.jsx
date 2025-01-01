import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Flavor1 from "../../assets/nuts/salted.png";
import Flavor2 from "../../assets/nuts/plain.png";
import Flavor3 from "../../assets/nuts/chilled.png";
import Flavor4 from "../../assets/nuts/honey.png";
import { motion } from "framer-motion";
import { FadeLeft } from "../../utility/animations";
import { IoBagHandleOutline } from "react-icons/io5";
import { CartContext } from "../../context/CartContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegShareSquare, FaShareSquare } from "react-icons/fa";

const MenusData = [
  {
    id: 1,
    title: "Roasted & salted",
    link: "/",
    img: Flavor1,
    description: "Crunchy and salty roasted nuts for a perfect snack.",
    delay: 0.3,
  },
  {
    id: 2,
    title: "Roasted plain",
    link: "/",
    img: Flavor2,
    description: "Simple yet delicious plain roasted nuts.",
    delay: 0.6,
  },
  {
    id: 3,
    title: "Roasted & chillied",
    link: "/",
    img: Flavor3,
    description: "Spicy roasted nuts with a kick of chili.",
    delay: 0.9,
  },
  {
    id: 4,
    title: "Honey coated",
    link: "/",
    img: Flavor4,
    description: "Sweet and crunchy honey-coated nuts.",
    delay: 1.2,
  },
];

const Menus = ({ setCartBlink }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [likedItems, setLikedItems] = useState({});
  const [sharedItems, setSharedItems] = useState({});

  const handleOrderClick = () => {
    navigate('/Contacts');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartBlink(true);  // Trigger blinking when an item is added to cart
    setTimeout(() => setCartBlink(false), 1000);  // Stop blinking after 1 second
  };

  const toggleLike = (id) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShare = (id) => {
    setSharedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="100 py-12">
      <div className="container mx-auto px-4 pt-0 pb-20 flex flex-wrap justify-around gap-4 "> {/* Reduced padding-top */}
        <motion.h1
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl font-bold text-left pb-10 uppercase font-averia mt-[-24px]"
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
              className="relative bg-white rounded-3xl px-4 py-2 shadow-[0_0_22px_0_rgba(0,0,0,0.15)] flex flex-col justify-center items-center gap-3 w-64"
            >
              <div
                className="absolute top-4 left-4 text-2xl cursor-pointer"
                onClick={() => toggleLike(menu.id)}
              >
                {likedItems[menu.id] ? (
                  <AiFillHeart className="text-primary" />
                ) : (
                  <AiOutlineHeart />
                )}
              </div>
              <div
                className="absolute top-4 right-4 text-2xl cursor-pointer"
                onClick={() => toggleShare(menu.id)}
              >
                {sharedItems[menu.id] ? (
                  <FaShareSquare className="text-primary" />
                ) : (
                  <FaRegShareSquare />
                )}
              </div>
              <img
                src={menu.img}
                alt={menu.title}
                className="w-[150px] self-center"
              />
              <div className="mt-4">
                <h1 className="text-lg font-semibold font-averia text-center">{menu.title}</h1>
                <p className="text-sm text-gray-600 text-center">{menu.description}</p>
              </div>
              <button
                className="primary-btn text-white py-2 px-4 rounded mt-2"
                onClick={() => handleAddToCart(menu)}
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold font-averia">
            Any flavor for Kes 1000 each
          </h2>
          <motion.div
            variants={FadeLeft(1.5)}
            initial="hidden"
            whileInView="visible"
            className="flex justify-center mt-4"
          >
            <button
              className="primary-btn flex items-center gap-2"
              onClick={handleOrderClick}
            >
              <span>
                <IoBagHandleOutline />
              </span>
              Bulk Order
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Menus;
