import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY && scrollY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = scrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleNavClick = (e, sectionId) => {
      e.preventDefault();
      const target = document.getElementById(sectionId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Offset for top nav
          behavior: 'smooth'
        });
        setMobileOpen(false);
      }
    };

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const sectionId = link.getAttribute('href').substring(1);
      link.onclick = (e) => handleNavClick(e, sectionId);
    });

    const sections = document.querySelectorAll('section[id]');
    
    let observer;
    if (sections.length) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0
        }
      );
      sections.forEach(section => observer.observe(section));
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="top-nav"
    >
      <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>
          <span className="text-gradient">Jag</span>man.
        </h3>
      </a>

      <div className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--text-main)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>

      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
        <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
        <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a>
        <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
      </div>
    </motion.nav>
  );
}
