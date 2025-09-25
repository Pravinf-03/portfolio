// src/App.js
import React from "react";
import { motion } from "framer-motion";
import Intro from "./components/Intro";
import Navgate from "./components/Navgate";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";

// Smooth scroll

function App() {

  return (
    <div className="dark bg-gray-900 text-gray-100 font-sans">

      <Navgate></Navgate>
      <Intro></Intro>
      <About></About>
      <Experience></Experience>
      <Projects></Projects>

      {/* Contact Section */}
      <section id="contact" className="py-20 container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Get In Touch
        </motion.h2>
        <form className="max-w-xl mx-auto bg-gray-800 shadow rounded-2xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full border rounded-lg p-3 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-6 text-center">
        <p>© {new Date().getFullYear()} Pravin F. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
