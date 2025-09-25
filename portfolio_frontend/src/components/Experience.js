import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Briefcase } from 'lucide-react';
import api from '../api';

function Experience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Updated API call to fetch experiences data
    api.get("/work-experience/").then((res) => {
      if (res.data.length > 0) {
        setExperiences(res.data);
      }
    }).catch((err) => console.error(err));
  }, []);  

  // Auto-play functionality
  useEffect(() => {
    if (experiences.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [experiences.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (experiences.length === 0) {
    return (
      <section id="experience" className="text-gray-300 w-full max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="text-gray-300 text-center">
          <div className="text-gray-300 animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-300 text-gray-400 mt-4">Loading experiences...</p>
        </div>
      </section>
    );
  }

  const currentExperience = experiences[currentIndex];

  return (
    <section id="experience" className="text-gray-300 w-full max-w-6xl mx-auto px-6 md:px-12 py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="text-gray-300 text-center mb-12">
        <h2 className="text-gray-300 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
          Professional Experience
        </h2>
        <p className="text-gray-300 text-gray-400 text-lg">My journey through the tech industry</p>
      </div>

      {/* Timeline Navigation */}
      <div className="text-gray-300 relative mb-12">
        <div className="text-gray-300 flex items-center justify-between">
          {experiences.map((_, index) => (
            <div key={index} className="text-gray-300 flex-1 relative">
              <button
                onClick={() => goToSlide(index)}
                className={`w-full h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
              {index < experiences.length - 1 && (
                <div className="text-gray-300 absolute top-1/2 right-0 w-4 h-0.5 bg-gray-700 transform -translate-y-1/2 translate-x-2" />
              )}
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="text-gray-300 flex justify-between mt-4">
          {experiences.map((exp, index) => (
            <div key={index} className="text-gray-300 flex flex-col items-center">
              <button
                onClick={() => goToSlide(index)}
                className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-slate-900 shadow-lg scale-110'
                    : 'bg-slate-800 border-gray-600 hover:border-gray-400'
                }`}
              />
              <span className={`text-sm mt-2 font-medium ${
                index === currentIndex ? 'text-blue-400' : 'text-gray-500'
              }`}>
                {exp.period?.split(' - ')[0] || 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Card */}
      <div className="text-gray-300 relative bg-slate-900 rounded-xl shadow-xl p-6 md:p-12 min-h-96">
        {/* Nav Buttons */}
        <button
          onClick={goToPrevious}
          className="text-gray-300 absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-500 sm:bg-gradient-to-r sm:from-blue-500 sm:to-purple-500 sm:w-12 sm:h-12 sm:rounded-full sm:flex sm:items-center sm:justify-center"          
        >
          <ChevronLeft className="text-gray-300 w-6 h-6 mx-auto" />
        </button>

        <button
          onClick={goToNext}
          className="text-gray-300 absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-500 sm:bg-gradient-to-r sm:from-blue-500 sm:to-purple-500 sm:w-12 sm:h-12 sm:rounded-full sm:flex sm:items-center sm:justify-center"
        >
          <ChevronRight className="text-gray-300 w-6 h-6 mx-auto" />
        </button>

        {/* Content */}
        <div className="text-gray-300 px-4 md:px-8 animate-fade-in">
          <div className="text-gray-300 flex items-start justify-between mb-6">
            <div className="text-gray-300 flex-1">
              <h3 className="text-gray-300 text-2xl md:text-3xl font-bold text-white mb-2">{currentExperience.role}</h3>
              <div className="text-gray-300 flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                <div className="text-gray-300 flex items-center gap-1">
                  <Briefcase className="text-gray-300 w-4 h-4" />
                  <span>{currentExperience.company}</span>
                </div>
                <div className="text-gray-300 flex items-center gap-1">
                  <MapPin className="text-gray-300 w-4 h-4" />
                  <span>{currentExperience.location}</span>
                </div>
                <div className="text-gray-300 flex items-center gap-1">
                  <Calendar className="text-gray-300 w-4 h-4" />
                  <span>{currentExperience.period}</span>
                </div>
              </div>
            </div>
            <div className="text-gray-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-full">
              <span className="text-gray-300 text-sm font-semibold text-blue-300">{currentExperience.duration}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-gray-300 text-lg leading-relaxed mb-6">
            {currentExperience.description}
          </p>

          {/* Tech */}
          <div className="text-gray-300 mb-6">
            <h4 className="text-gray-300 text-lg font-semibold text-white mb-3">Technologies Used</h4>
            <div className="text-gray-300 flex flex-wrap gap-2">
              {currentExperience.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="text-gray-300 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow hover:shadow-md transition"
                >
                  {tech}
                </span>
              )) || <span className="text-gray-300 text-gray-400">No technologies specified</span>}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="text-gray-300 text-lg font-semibold text-white mb-3">Key Achievements</h4>
            <ul className="text-gray-300 space-y-2">
              {currentExperience.achievements?.map((achievement, index) => (
                <li key={index} className="text-gray-300 flex items-start gap-3">
                  <div className="text-gray-300 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-gray-300">{achievement}</span>
                </li>
              )) || (
                <li className="text-gray-300 flex items-start gap-3">
                  <div className="text-gray-300 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-gray-300">No achievements specified</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-gray-300 absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-400 w-6' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

export default Experience;