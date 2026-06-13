import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const featuredProjects = [
  {
    id: 1,
    title: "Men's Mental Health Club",
    link: "https://ubcmmhc.com/",
    image: "/assets/MensMentalHealthWeb.png",
    type: "COMMUNITY PLATFORM",
  },
  {
    id: 2,
    title: "TheRoommate",
    link: "https://theroommate-production.up.railway.app/",
    image: "/assets/TheRoommateWeb.png",
    type: "HOUSING MANAGEMENT",
  }
];

export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: true, amount: 0.7 });

  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 8000);
  };

  useEffect(() => {
    if (!isInView) return;
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [isInView]);

  const goNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % featuredProjects.length);
    startTimer();
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    startTimer();
  };

  const project = featuredProjects[index];

  return (
    <div className="featured-wrapper" ref={carouselRef}>
      <div className="kicker-label" style={{ marginBottom: '12px' }}>CURRENTLY WORKING ON</div>
      
      <motion.div 
        className="hero-carousel-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="carousel-inner">
          <AnimatePresence>
            <motion.div
              key={project.id}
              className="carousel-slide"
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                hover: {}
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Hover Overlay with prev/next + website link */}
              <motion.div
                className="carousel-hover-overlay"
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 0 }, 
                  hover: { opacity: 1 }
                }}
                transition={{ duration: 0.3 }}
              >
                <button className="carousel-overlay-arrow left" onClick={goPrev} aria-label="Previous project">←</button>
                <div className="carousel-overlay-center" onClick={() => window.open(project.link, '_blank')}>
                  <div className="carousel-overlay-text hero-display">
                    GO TO WEBSITE ↗
                  </div>
                </div>
                <button className="carousel-overlay-arrow right" onClick={goNext} aria-label="Next project">→</button>
              </motion.div>

              <img src={project.image} alt={project.title} className="carousel-bg" />

              <div className="carousel-content">
                <div className="mono-label carousel-kicker">
                  {project.type}
                </div>
                <h3 className="story-title carousel-title">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="carousel-indicators" style={{ marginTop: '16px' }}>
          {featuredProjects.map((_, i) => (
            <div 
              key={i} 
              className={`carousel-dot ${i === index ? 'active' : ''}`}
              onClick={() => { setIndex(i); startTimer(); }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
