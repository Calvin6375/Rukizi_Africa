import React from 'react'
import { MdMenu } from 'react-icons/md';
import { GiPeanut } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import ResponsiveMenu from './ResponsiveMenu'; 


const NavbarMenu = [
    {
        id: 1,
        title: "Home",
        link: "#"
    },
    {
        id: 2,
        title: "Products",
        link: "#"
    },
    {
        id: 3,
        title: "About",
        link: "#"
    },
    {
        id: 4,
        title: "Shop",
        link: "#"
    },
    {
        id: 5,
        title: "Contacts",
        link: "#"
    },
]

const Navbar = () => {

  const [open, setOpen] = React.useState(false);

    return (
    <>
    <nav>
      <div className='container flex justify-between items-center py-4 md:pt-4'>
        {/* Logo Section*/}
        <div className='text-zxl flex items-center gap-2 font-bold uppercase'>
            <p className='text-primary font-averia text-3xl'>Rukizi</p>
            <p className='text-secondary font-averia text-2xl' >Africa</p>
            <GiPeanut className='text-green-500' />
        </div>

        {/* Menu Section*/}
        <div className='hidden md:block'>
            <ul className='flex items-center gap-6 text-gray-600 font-averia'>
                {NavbarMenu.map((menu) => (
                    <li key={menu.id} >
                     <a href={menu.link}
                     className='inline-block py-1 px-3 hover:text-primary
                     hover:shadow-[0_3px_0_-1px_#ef4444] font-semibold'
                     >{menu.title}</a>   
                    </li>
               ))}
               <button className='text-2xl hover:bg-primary hover:text-white rounded-full p-2
               duration-200 '>
                <MdOutlineShoppingCart />
               </button>
            </ul>
        </div>
        {/* Moblie Hambugerer Menu section*/}
        <div className='md:hidden' onClick={() =>
            setOpen(!open)}>
            <MdMenu className="text-4xl" />
        </div>
      </div>
    </nav>
    
    {/*Mobile Menu section */}
    <ResponsiveMenu open={open} />

    </>
  )
}

export default Navbar
