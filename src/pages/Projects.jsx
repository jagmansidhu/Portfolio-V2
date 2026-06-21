import React from 'react';
import { motion } from 'framer-motion';
import Project from '../components/Project';
import { projects } from '../data/content';

export default function Projects() {
  return (
    <>
      <section id="projects-hero" className="data-hero section-wrapper">
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="kicker-label" style={{ marginBottom: '12px' }}>BUILDS</div>
            <h1 className="data-page-title">Projects</h1>
            <p className="section-lead" style={{ marginBottom: 0 }}>
              Hackathon builds and personal projects with live demos or public repos.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section-wrapper" style={{ paddingTop: '2rem' }}>
        <div className="section-content">
          <div className="storystream">
            {projects.map((project, id) => (
              <Project
                key={id}
                title={project.title}
                tagline={project.tagline}
                subtitle={project.subtitle}
                subtitleBold={project.subtitleBold}
                desc={project.desc}
                tech={project.tech}
                projectLink={project.projectLink}
                githubLink={project.githubLink}
                linkedinLink={project.linkedinLink}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
