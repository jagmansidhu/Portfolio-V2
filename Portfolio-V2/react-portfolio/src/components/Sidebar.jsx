import React, { useEffect, useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleNavClick = (e, sectionId) => {
      e.preventDefault();
      const target = document.getElementById(sectionId);
      const scrollContainer = document.querySelector('.main');
      if (target && scrollContainer) {
        scrollContainer.scrollTo({
          top: target.offsetTop - 32,
          behavior: 'smooth'
        });
      }
      setIsOpen(false);
    };

    const navLinks = document.querySelectorAll('.nav-link-container[data-section]');
    navLinks.forEach(link => {
      const sectionId = link.getAttribute('data-section');
      link.onclick = (e) => handleNavClick(e, sectionId);
    });

    const sections = document.querySelectorAll('section[id]');
    const scrollContainer = document.querySelector('.main');
    
    let observer;
    if (scrollContainer && sections.length) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0
        }
      );
      sections.forEach(section => observer.observe(section));
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="sidebar w-nav"
    >
      <div className="nav-content">
        <a href="#home" className="w-nav-brand" aria-label="home" onClick={(e) => { e.preventDefault(); document.querySelector('.main')?.scrollTo({top: 0, behavior: 'smooth'}); }}>
          <div className="niv-data">
            <img
              src="/assets/jag.jpg"
              loading="eager"
              alt="Profile picture"
              className="niv-image"
            />
            <div>
              <div className="label-white">Jagman Sidhu</div>
              <div className="label-gray">Software Engineer</div>
            </div>
          </div>
        </a>

        <nav 
          role="navigation" 
          style={{ display: isOpen ? 'block' : '' }}
          className={`w-nav-menu ${isOpen ? 'is-visible is-open' : ''}`}
        >
          <a
            href="#home"
            className={`nav-link-container w-inline-block ${activeSection === 'home' ? 'w--current' : ''}`}
            data-section="home"
          >
            <img
              src="/assets/home.svg"
              loading="eager"
              alt=""
              className="nav-link-image"
            />
            <div>Home</div>
          </a>
          <a
            href="#experience"
            className={`nav-link-container w-inline-block ${activeSection === 'experience' ? 'w--current' : ''}`}
            data-section="experience"
          >
            <img
              src="/assets/dns.svg"
              loading="eager"
              alt=""
              className="nav-link-image"
            />
            <div>Experience</div>
          </a>
          <a
            href="#projects"
            className={`nav-link-container w-inline-block ${activeSection === 'projects' ? 'w--current' : ''}`}
            data-section="projects"
          >
            <img
              src="/assets/browser.svg"
              loading="eager"
              alt=""
              className="nav-link-image"
            />
            <div>Projects</div>
          </a>
        </nav>

        <div
          className="navbar-icon-button w-nav-button"
          aria-label="menu"
          role="button"
          tabIndex="0"
          onClick={toggleNav}
        >
          <img
            src="/assets/menu.svg"
            loading="eager"
            alt=""
            className="navbar-icon"
          />
        </div>
      </div>
    </aside>
  );
}
