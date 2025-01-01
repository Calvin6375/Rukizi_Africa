import React from "react";
import { useNavigate } from "react-router-dom";
import BannerPng from "../../assets/nuts/banner.png";
import { motion } from "framer-motion";
import { FadeUp } from "../../utility/animations";

const Banner = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate("/contacts");
  };

  return (
    <section className="">
      <div className="container grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 py-14">
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            viewport={{ once: true }}
            src={BannerPng}
            alt=""
            className="w-[300px] md:max-w-[400px] h-full object-cover drop-shadow"
          />
        </div>
        {/* Brand Info */}
        <div className="flex flex-col justify-center">
          <div className="text-center md:text-left space-y-4 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.50)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl lg:text-6xl font-bold uppercase font-averia"
            >
              Brand Info
            </motion.h1>
            <motion.p
              style={{ textAlign: 'justify' }}
              variants={FadeUp(0.7)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-averia"
            >
              At Rukizi Africa, we are dedicated to bringing you the finest cashew nuts,
              sustainably sourced from the rich soils of Kilifi and Kwale County.
              Our journey begins with carefully selecting only the best cashews,
              ensuring each nut boasts superior taste and texture.
              Committed to sustainable farming and fair trade practices,
              we support local farmers and communities,
              fostering growth and prosperity.
            </motion.p>
            <motion.p
              style={{ textAlign: 'justify' }}
              variants={FadeUp(0.9)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-averia"
            >
              Whether savoring our classic roasted cashews or
              exploring our unique spiced varieties,
              Rukizi Africa Store promises an exceptional snacking experience. Indulge in the delicious and wholesome world of Rukizi Africa Store,
              where quality and customer satisfaction are our utmost priorities.
            </motion.p>
            {/* button section */}
            <motion.div
              variants={FadeUp(1.1)}
              initial="hidden"
              animate="visible"
              className="flex justify-center md:justify-start"
            >
              <button onClick={handleLearnMoreClick} className="primary-btn">Learn More</button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
