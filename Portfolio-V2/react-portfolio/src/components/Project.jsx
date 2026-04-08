import React from 'react';
import { motion } from 'framer-motion';
import './Project.css';

export default function Project({ title, desc = [], tech = [], projectLink, githubLink, subtitle }) {
  const hasProjectLink = projectLink && projectLink !== "cheese" && projectLink !== "";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-panel project-card"
    >
      <div className="project-header">
        <h3 className="project-title">
          {hasProjectLink ? (
            <a href={projectLink} target="_blank" rel="noopener noreferrer" className="spotlight-item" style={{ padding: '4px 8px', borderRadius: '4px' }}>
              <span className="btn-content">{title}</span>
            </a>
          ) : (
            <span>{title}</span>
          )}
        </h3>

        {hasProjectLink && (
           <a href={projectLink} className="icon-link spotlight-item" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', padding: '8px', borderRadius: '50%' }}>
            <span className="btn-content" style={{ display: 'flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          </a>
        )}
        
        {githubLink && (
          <a href={githubLink} className="icon-link spotlight-item" target="_blank" rel="noopener noreferrer" style={{ marginLeft: !hasProjectLink ? 'auto' : '10px', padding: '8px', borderRadius: '50%' }}>
            <span className="btn-content" style={{ display: 'flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </span>
          </a>
        )}
      </div>

      {subtitle && (
        <div className="project-subtitle">{subtitle}</div>
      )}

      <div className="project-desc">
        <ul>
          {desc.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>

      <div className="chips">
        {tech.map((techItem, idx) => <span className="chip" key={idx}>{techItem}</span>)}
      </div>
    </motion.div>
  );
}
