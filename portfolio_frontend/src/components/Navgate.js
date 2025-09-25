/* import React, {useState, useEffect} from "react";
import api from "../api";

function Navgate() {

  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    api.get("/personal-info/").then((res)=>{
      if (res.data.length > 0){
        setPersonalInfo(res.data[0]);
      }
    }).catch((err) => console.error(err));
  }, []);
  
  return (
      <header className="fixed top-0 left-0 w-full bg-gray-800 shadow z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-blue-400">
          {personalInfo?.fname} {personalInfo?.lname}
        </div>
        <ul className="hidden md:flex space-x-8 font-medium">
          <li><a href="#introduction" className="hover:text-blue-400">Intro</a></li>
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}
export default Navgate; */

import React, { useState, useEffect } from "react";
import api from "../api";

function Navgate() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    api.get("/personal-info/")
      .then((res) => {
        if (res.data.length > 0) {
          setPersonalInfo(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 shadow z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo/Name */}
        <div className="text-2xl font-bold text-blue-400">
          {personalInfo?.fname} {personalInfo?.lname}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-white">
          <li>
            <a href="#introduction" className="hover:text-blue-400 transition-colors duration-200">
              Intro
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-400 transition-colors duration-200">
              About
            </a>
          </li>
          <li>
            <a href="#experience" className="hover:text-blue-400 transition-colors duration-200">
              Experience
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-blue-400 transition-colors duration-200">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-400 transition-colors duration-200">
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 p-4 font-medium text-white">
          <li>
            <a
              href="#introduction"
              className="block py-2 hover:text-blue-400 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Intro
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block py-2 hover:text-blue-400 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="block py-2 hover:text-blue-400 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="block py-2 hover:text-blue-400 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block py-2 hover:text-blue-400 transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navgate;