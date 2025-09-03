// src/App.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Intro from "./components/Intro";
import Navgate from "./components/Navgate";
import About from "./components/About";

// Smooth scroll

function App() {

  return (
    <div className="dark bg-gray-900 text-gray-100 font-sans">

      <Navgate></Navgate>
      <Intro></Intro>
      <About></About>

      

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                className="bg-gray-900 rounded-2xl shadow hover:shadow-lg transition p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: project * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2">Project {project}</h3>
                <p className="text-gray-400">
                  A brief description of the project goes here. Highlight technologies,
                  purpose, and key achievements.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-blue-400 font-medium hover:underline"
                >
                  View Details →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
