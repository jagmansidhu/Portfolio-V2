import React from 'react';
import { motion } from 'framer-motion';
import Project from '../components/Project';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <>
      <section id="experience-hero" className="data-hero section-wrapper">
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="kicker-label" style={{ marginBottom: '12px' }}>WORK HISTORY</div>
            <h1 className="data-page-title">Technical Experience</h1>
            <p className="section-lead" style={{ marginBottom: 0 }}>
              Software development and IT roles.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="section-wrapper" style={{ paddingTop: '2rem' }}>
        <div className="section-content">
          <div className="storystream">
            {experience.map((item, id) => (
              <Project
                key={id}
                role={item.role}
                company={item.company}
                tagline={item.tagline}
                subtitle={item.subtitle}
                subtitleBold={item.subtitleBold}
                location={item.location}
                desc={item.desc}
                tech={item.tech}
                projectLink={item.projectLink}
                githubLink={item.githubLink}
                linkedinLink={item.linkedinLink}
                isExperience={true}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
