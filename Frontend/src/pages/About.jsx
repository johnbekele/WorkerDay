import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { AnimatedTestimonialsDemo } from "../Components/AnimatedTestimonialsDemo";
import "./About.css";

export default function About() {
  const sections = [
    {
      title: "Introduction",
      content: 'Workery Day is a full-stack web application developed using modern technologies and frameworks. This project showcases the implementation of a comprehensive employee management system as part of the "Programming Languages for Web Applications" course.'
    },
    {
      title: "Technical Stack - Frontend",
      content: "• React.js - Building user interface components\n• Material UI - Modern and responsive design components\n• Accentuity - UI/UX enhancement and styling\n• React Router - Client-side routing\n• Redux/Context API - State management"
    },
    {
      title: "Technical Stack - Backend",
      content: "• Node.js - Runtime environment\n• Express.js - Web application framework\n• PostgreSQL - Relational database management\n• REST API - API architecture\n• JWT - Authentication and authorization"
    },
    {
      title: "Key Features",
      content: "• Secure user authentication\n• Employee profile management\n• Real-time attendance tracking\n• Leave request system\n• Performance monitoring\n• Dynamic reporting\n• Role-based access control"
    },
    {
      title: "Development Focus",
      content: "• Modern JavaScript (ES6+)\n• Component-based architecture\n• RESTful API design\n• Database relationships\n• State management patterns\n• Responsive design principles\n• Security best practices"
    },
    {
      title: "Project Details",
      content: "Submitted by: Yohans Bekele 48306\nCourse Instructor: Cezary Graul"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isAutoPlay) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sections.length);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, sections.length]);

  // Scroll detection with debounce
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsAutoPlay(true);
      }, 1000); // Wait 1 second after scrolling stops
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle indicator click
  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const variants = {
    enter: { x: 1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -1000, opacity: 0 }
  };

  return (
    <div id="about" className="min-h-content flex justify-center items-center scroll-mt-16 ui">
      <div className="max-w-4xl mih-h-200px w-full p-8 rounded-lg bg-red-50 ui shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">About Workery Day</h1>
        
        <div className="relative h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 1}
              }}
              className="absolute w-full"
            >
              <div className="ui p-6 rounded-lg">
                <h2 className="text-xl font-semibold dark:text-white mb-4">
                  {sections[currentIndex].title}
                </h2>
                <div className="text-gray-500 whitespace-pre-line">
                  {sections[currentIndex].content}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Progress indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-150 cursor-pointer ${
                index === currentIndex 
                  ? "bg-blue-500 scale-125" 
                  : "bg-gray-300 hover:bg-blue-300"
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>

        <AnimatedTestimonialsDemo />
      </div>
    </div>
  );
}