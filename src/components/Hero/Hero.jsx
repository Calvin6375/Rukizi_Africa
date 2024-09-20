import React from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import HeroPng from "../../assets/nuts/Hero.png";
import { motion } from "framer-motion";
import { FadeRight } from "../../utility/animations";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Hero = () => {
  const navigate = useNavigate(); // Create navigate function

  const handleOrderClick = () => {
    navigate('/order'); // Navigate to the order page
  };

  return (
    <section>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
          <div className="text-center md:text-left space-y-6 lg:max-w-[400px]">
            <motion.h1
              variants={FadeRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-5xl font-bold leading-relaxed xl:leading-loose font-averia"
            >
              Healthy
              <br />
              Fresh<span className="text-secondary"> Korosho!</span>
            </motion.h1>
            <motion.p 
              variants={FadeRight(0.9)}
              initial="hidden"
              animate="visible"
              className="text-2xl tracking-wide"
            >
              Order Now For and Enjoy a Fresh Coastal Treat
            </motion.p>        
            <motion.p 
              variants={FadeRight(1.2)}
              initial="hidden"
              animate="visible"        
              className="text-gray-400"
            >
              Healthy and yummy korosho. <br/>
              Improves vitality, good source of protein, helps in weight management and is heart friendly.
            </motion.p>
            {/* Button section */}
            <motion.div 
              variants={FadeRight(1.5)}
              initial="hidden"
              animate="visible"
              className="flex justify-center md:justify-start"
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

        {/* Hero Images */}
        <div className="flex justify-center items-center">
          <motion.img 
            initial={{ opacity: 0, x: 200, rotate: 75 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={HeroPng}
            alt=""  
            className="w-[350px] md:w-[500px] drop-shadow"
          />
        </div>
        {/* Leaf Images */}
      </div>    
    </section>
  );
};

export default Hero;
