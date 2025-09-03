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
      <section id="about" className="py-20 container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start bg-white shadow-lg rounded-2xl p-8">
          {/* Left Column: Profile + Info */}
          <div className="flex flex-row items-center space-x-6">
            <motion.img
              src={personalInfo.profile_photo}
              alt="Profile"
              className="w-40 h-48 object-top rounded-xl shadow-md"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />

            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-bold">Name:</span> {personalInfo.fname}{" "}
                {personalInfo.lname}
              </p>
              <p>
                <span className="font-bold">Profile:</span> Backend Developer
              </p>
              <p>
                <span className="font-bold">Email:</span>{" "}
                {personalInfo.email}
              </p>
              <p>
                <span className="font-bold">Phone:</span>{" "}
                {personalInfo.contact }
              </p>
            </div>

            
          </div>

          {/* Right Column: About Description */}
          <motion.div
            className="text-lg leading-relaxed text-gray-800 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p>
              I am a passionate <b>Backend Developer specializing in Django</b>{" "}
              with strong problem-solving skills and a drive for building
              scalable, efficient solutions. Skilled in Python, Django, MySQL,
              and modern web technologies, I enjoy creating impactful systems
              that enhance performance and usability.
            </p>

            <p>
              My recent work includes developing a{" "}
              <b>Server Performance Monitoring System</b>, where I designed APIs
              to collect, process, and visualize real-time server metrics,
              improving system reliability and resource management. I have also
              automated database operations to increase efficiency and reduce
              manual intervention.
            </p>

            <p>
              I thrive in collaborative environments, where I contribute ideas,
              write clean and maintainable code, and learn from peers to
              continuously improve my craft. My long-term goal is to evolve into
              a <b>full-stack developer</b>, bridging backend logic with frontend
              experiences to deliver complete, user-focused applications.
            </p>

            {/* Skills Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
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
