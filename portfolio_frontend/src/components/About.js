import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";

function About() { 
const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    api
      .get("/personal-info/")
      .then((res) => {
        if (res.data.length > 0) {
          setPersonalInfo(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!personalInfo) return null;

  const skills = ["Python", "Django", "MySQL", "REST APIs", "PostgreSQL", "Linux", "Git", "Shell Scripting"];

  return (
    <div>
      {/* About Section */}
      <section id="about" className="py-20 sm:py-16 lg:py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start bg-white shadow-lg rounded-2xl p-4 sm:p-6 lg:p-8">
          {/* Profile Section - Responsive Layout */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.img
              src={personalInfo.profile_photo}
              alt="Profile"
              className="w-32 h-40 sm:w-36 sm:h-44 lg:w-40 lg:h-48 object-cover object-top rounded-xl shadow-md flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />

            <div className="text-gray-700 space-y-2 text-center sm:text-left w-full">
              <p className="text-sm sm:text-base">
                <span className="font-bold">Name:</span> {personalInfo.fname}{" "}
                {personalInfo.lname}
              </p>
              <p className="text-sm sm:text-base">
                <span className="font-bold">Profile:</span> Backend Developer
              </p>
              <p className="text-sm sm:text-base break-all sm:break-normal">
                <span className="font-bold">Email:</span>{" "}
                {personalInfo.email}
              </p>
              <p className="text-sm sm:text-base">
                <span className="font-bold">Phone:</span>{" "}
                {personalInfo.contact}
              </p>
            </div>
          </div>

          {/* About Description - Responsive Text */}
          <motion.div
            className="text-base sm:text-lg leading-relaxed text-gray-800 space-y-4 sm:space-y-6 mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-justify">
              I am a passionate <b>Backend Developer specializing in Django</b>{" "}
              with strong problem-solving skills and a drive for building
              scalable, efficient solutions. Skilled in Python, Django, MySQL,
              and modern web technologies, I enjoy creating impactful systems
              that enhance performance and usability.
            </p>

            <p className="text-justify">
              My recent work includes developing a{" "}
              <b>Server Performance Monitoring System</b>, where I designed APIs
              to collect, process, and visualize real-time server metrics,
              improving system reliability and resource management. I have also
              automated database operations to increase efficiency and reduce
              manual intervention.
            </p>

            <p className="hidden sm:block text-justify">
              I thrive in collaborative environments, where I contribute ideas,
              write clean and maintainable code, and learn from peers to
              continuously improve my craft. My long-term goal is to evolve into
              a <b>full-stack developer</b>, bridging backend logic with frontend
              experiences to deliver complete, user-focused applications.
            </p>

            {/* Skills Section - Responsive Grid */}
            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;