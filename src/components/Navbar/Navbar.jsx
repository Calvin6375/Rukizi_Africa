import React from 'react';
import { GiPeanut } from "react-icons/gi";
import { MdOutlineShoppingCart, MdMenu } from "react-icons/md";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavbarMenu = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "Products", link: "/menus" }, // Update route if needed
    { id: 3, title: "About", link: "/banner" }, // Ensure this route is correct
    { id: 4, title: "Order", link: "/order" }, // Update route if needed
    { id: 5, title: "Contacts", link: "/contacts" } // Update route if needed
];

const Navbar = () => {
  return (
    <nav>
      <div className='container flex justify-between items-center py-4 md:pt-4'>
        {/* Logo Section*/}
        <div className='text-2xl flex items-center gap-2 font-bold uppercase'>
            <p className='text-primary font-averia text-6xl'>Rukizi</p>
            <p className='text-secondary font-averia text-5xl'>Africa</p>
            <GiPeanut className='text-green-500 text-4xl' />
        </div>

        {/* Menu Section*/}
        <div className='hidden md:block'>
            <ul className='flex items-center gap-6 text-gray-600'>
                {NavbarMenu.map((menu) => (
                    <li key={menu.id}>
                        <Link to={menu.link}
                        className='inline-block py-1 px-3 hover:text-primary
                        hover:shadow-[0_3px_0_-1px_#ef4444] font-semibold font-averia'
                        >{menu.title}</Link>
                    </li>
                ))}
                <button className='text-2xl hover:bg-primary hover:text-white rounded-full p-2
                duration-200'>
                    <MdOutlineShoppingCart />
                </button>
            </ul>
        </div>
        
        {/* Mobile Hamburger Menu Section*/}
        <div className='md:hidden'>
            <MdMenu className='text-4xl'/>
        </div>
      </div>
    </nav>
  );};
export default Navbar;