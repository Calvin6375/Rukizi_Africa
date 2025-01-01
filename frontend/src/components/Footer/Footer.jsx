import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { motion } from "framer-motion";
import { GiPeanut } from "react-icons/gi";

const Footer = () => {
  return (
  <footer className="bg-primary/10 py-12 mt-12">
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{opacity: 1 }}
    transition={{ duration: 1, delay: 0.2}}
    className="container flex jusify-between items-center">
    {/* Logo section*/}    
        <div className="text-2xl flex items-center gap-2
        font-bold uppercase">
            <p className="text-primary font-averia">Rukizi</p>
                        <p className="text-secondary font-averia">Store</p>
                        <GiPeanut className="text-green-500" />

        </div>
    {/* Social icons*/}    
        <div className="text-3xl flex items-center gap-4 mt-6
        text-gray-700 w-full justify-end">
            <FaInstagram/>
            <FaTwitter/>
            <FaFacebook/>
            <FaYoutube/>            
        </div>
    </motion.div>
  </footer>
  );
};

export default Footer
