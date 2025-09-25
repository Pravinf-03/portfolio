import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { throttle } from "lodash";
import api from "../api";

function Projects() {
  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    api.get("/projects/").then((res) => {
      if (res.data.length > 0) {
        const normalized = res.data.map((p) => ({
          ...p,
          tech: p.tags ? p.tags.map(t => t.name) : p.technologies?.split(",").map(s => s.trim()) || [],
        }));
        setProjects(normalized.slice(0, 5));
      }
    }).catch((err) => console.error(err));
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (projects.length === 0) return;

    intervalRef.current = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollAmount = container.firstChild?.offsetWidth + 24 || 0;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (container.scrollLeft >= maxScroll) {
        // Reset to beginning when reaching the end
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Slide to next card
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 3000); // Slide every 3 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [projects.length]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.firstChild?.offsetWidth + 24 || 0;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = throttle(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  }, 100);

  const handleViewDetails = (project) => {
    alert(`View Details clicked for: ${project.title}`);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 p-6 py-20" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-3 items-center mb-8">
          {/* Left spacer */}
          <div></div>

          {/* Centered title */}
          <div className="flex justify-center items-center gap-4">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Projects
            </h2>              
          </div>

          <div className="flex justify-end">
            <a href="/projects" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
              View All
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/50 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600/50 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide p-6 justify-between h-full scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {projects.map((project) => (
              <div key={project.id} className="flex-none w-80 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-xl overflow-hidden hover:border-slate-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group/card">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img src={project.image} alt=" " className="w-full h-48 object-cover transition-transform duration-500 group-hover/card:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover/card:text-blue-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm text-justify leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-md border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(project)}
                    className="flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium text-sm transition-all duration-300 group/btn"
                  >
                    View Details
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>

                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-slate-600 transition-all duration-300"
              />
            ))}
          </div>
        </div>
        
      </div>
      {/* Project Count Indicator */} 
      <div className="mt-6 text-center"> 
        <p className="text-slate-400 text-sm"> 
          Showing {projects.length} projects
        </p> 
      </div>
    </div>
  );
}

export default Projects;