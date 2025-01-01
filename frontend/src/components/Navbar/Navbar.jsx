import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext"; // Import CartContext
import { GiPeanut } from "react-icons/gi";
import { MdOutlineShoppingCart, MdMenu } from "react-icons/md";

const NavbarMenu = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Products", link: "/menus" },
  { id: 3, title: "About", link: "/banner" },
  { id: 4, title: "Contact us", link: "/contacts" }
];

const Navbar = () => {
  const { cartCount } = useContext(CartContext); // Access the cart count from context
  const [isVibrating, setIsVibrating] = useState(false);

  // Trigger vibration effect when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setIsVibrating(true);
      const vibrationTimer = setInterval(() => {
        setIsVibrating(false); // Reset vibration after 0.3 seconds
      }, 300);
      return () => clearInterval(vibrationTimer); // Cleanup the interval when component unmounts
    }
  }, [cartCount]);

  return (
    <nav>
      <div className="container flex justify-between items-center py-4 md:pt-4">
        {/* Logo Section */}
        <div className="text-2xl flex items-center gap-2 font-bold uppercase">
          <p className="text-primary font-averia text-6xl">Rukizi</p>
          <p className="text-secondary font-averia text-5xl">Africa</p>
          <GiPeanut className="text-green-500 text-4xl" />
        </div>

        {/* Menu Section */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-6 text-gray-600">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className="inline-block py-1 px-3 font-semibold font-averia hover:bg-[#DE2C4D] hover:text-white duration-500 rounded-full"
                >
                  {menu.title}
                </Link>
              </li>
            ))}

            {/* Cart Button with Vibration Effect */}
            <Link to="/cart"> {/* Wrap the button with Link */}
              <button
                className={`relative text-2xl rounded-full p-2 duration-500 ${
                  isVibrating ? "animate-blink" : "hover:scale-110" // Adding hover effect back here
                }`}
              >
                <MdOutlineShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </ul>
        </div>

        {/* Mobile Hamburger Menu Section */}
        <div className="md:hidden">
          <MdMenu className="text-4xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
