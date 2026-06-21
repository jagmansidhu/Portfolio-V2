import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;

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
  }, [isHomePage]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const routeClass = (path) =>
    location.pathname === path ? 'active' : '';

  return (
    <nav className={`top-nav ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="brand">
        <h3>
          <span>JAG</span>MAN
        </h3>
      </Link>

      <div className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'var(--text-primary)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>

      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className={`nav-link ${isHomePage && !location.hash && activeSection === 'home' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link to="/experience" className={`nav-link ${routeClass('/experience')}`}>
          Experience
        </Link>
        <Link to="/projects" className={`nav-link ${routeClass('/projects')}`}>
          Projects
        </Link>
        <Link to="/data" className={`nav-link ${routeClass('/data')}`}>
          Data
        </Link>
      </div>
    </nav>
  );
}
