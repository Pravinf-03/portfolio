// src/App.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api  from "../api";
import bgImage from "../assets/banner-image.jpeg";

function Intro() {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    api.get("/personal-info/").then((res)=>{
      if (res.data.length > 0){
        setPersonalInfo(res.data[0]);
      }
    }).catch((err) => console.error(err));
  }, []);

  if (!personalInfo){
    return <p>Loading ...</p>// simple loading
  }

  // navbar height (adjust if your nav uses a different size)
  const NAV_PX = 64; // 64px == Tailwind h-16

  return(    
          <section id="introduction" className="relative grid place-items-center text-white text-center px-6 pt-16 scroll-mt-16" style = {{ minHeight: `calc(100vh - ${NAV_PX}px)`, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

            {/* Content (above overlay) */}
            <div className="relative z-10 w-full max-w-3xl mx-auto">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-5xl font-extrabold mb-4">
                Hi, I’m {personalInfo.fname} 👋
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-xl max-w-2xl">
                {personalInfo.bio}
              </motion.p>
              <motion.a href="#projects" whileHover={{ scale: 1.05 }} className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-500 hover:text-gray-100 transition ">
                View My Work
              </motion.a>
            </div>
          </section>
  );

}

export default Intro;