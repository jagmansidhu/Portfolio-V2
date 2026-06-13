import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Project.css';

export default function Project({
  title,
  role,
  company,
  tagline,
  desc = [],
  tech = [],
  projectLink,
  githubLink,
  linkedinLink,
  subtitle,
  subtitleBold,
  location,
  isExperience
}) {
  const [expanded, setExpanded] = useState(false);
  const hasProjectLink = projectLink && projectLink !== "cheese" && projectLink !== "";
  const displayTitle = role || title;
  const linkTarget = hasProjectLink ? projectLink : null;
  const hasDetails = desc.length > 0 || tech.length > 0;

  const handleToggle = (event) => {
    if (event.target.closest('a')) return;
    setExpanded((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpanded((prev) => !prev);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="story-item"
    >
      <div className="story-rail">
        <div className="story-timestamp">
          {subtitle && (
            <span className="story-date">
              {subtitle}
              {subtitleBold && (
                <strong className="story-date-bold">
                  <span className="story-date-star" aria-hidden="true">★</span>
                  {subtitleBold}
                </strong>
              )}
            </span>
          )}
          {location && <span className="story-location">{location}</span>}
        </div>
        <div className="story-line"></div>
      </div>

      <div
        className={`story-card accent-slate${expanded ? ' is-expanded' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role={hasDetails ? 'button' : undefined}
        tabIndex={hasDetails ? 0 : undefined}
        aria-expanded={hasDetails ? expanded : undefined}
      >
        <div className="story-header">
          <div className="story-title-group">
            {isExperience ? (
              <div className="kicker-label">EXPERIENCE</div>
            ) : (
              <div className="kicker-label">PROJECT</div>
            )}

            <h3 className="story-title">
              {linkTarget ? (
                <a href={linkTarget} target="_blank" rel="noopener noreferrer">
                  {displayTitle}
                </a>
              ) : (
                <span>{displayTitle}</span>
              )}
            </h3>

            {company && <p className="story-company">{company}</p>}
            {tagline && <p className="story-tagline">{tagline}</p>}
          </div>

          <div className="story-header-actions">
            <div className="story-links">
              {hasProjectLink && (
                <a href={projectLink} className="link-icon" target="_blank" rel="noopener noreferrer" aria-label="Live site">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
              {githubLink && (
                <a href={githubLink} className="link-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}
              {linkedinLink && (
                <a href={linkedinLink} className="link-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn post">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}
            </div>

            {hasDetails && (
              <span className="story-expand-icon" aria-hidden="true">
                ↓
              </span>
            )}
          </div>
        </div>

        {hasDetails && (
          <div className="story-details">
            <div className="story-details-inner">
              {desc.length > 0 && (
                <div className="story-desc story-desc-plain">
                  {desc.map((item, idx) => <p key={idx}>{item}</p>)}
                </div>
              )}

              {tech.length > 0 && (
                <div className="story-tech">
                  <span className="story-tech-label">Tech stack</span>
                  <div className="story-chips">
                    {tech.map((techItem, idx) => <span className="chip" key={idx}>{techItem}</span>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
