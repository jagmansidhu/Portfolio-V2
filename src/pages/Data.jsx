import React from 'react';
import { motion } from 'framer-motion';
import Project from '../components/Project';
import { dataProjects } from '../data/dataProjects';

export default function Data() {
  return (
    <>
      <section id="data-hero" className="data-hero section-wrapper">
        <div className="section-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="kicker-label" style={{ marginBottom: '12px' }}>RESEARCH & ANALYSIS</div>
            <h1 className="data-page-title">Data Projects</h1>
            <p className="section-lead" style={{ marginBottom: 0 }}>
              Econometrics and data analysis work. Each card links to the GitHub repo.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="data-projects" className="section-wrapper" style={{ paddingTop: '2rem' }}>
        <div className="section-content">
          <div className="storystream">
            {dataProjects.map((project, id) => (
              <Project
                key={id}
                title={project.title}
                tagline={project.tagline}
                subtitle={project.subtitle}
                subtitleBold={project.subtitleBold}
                desc={project.desc}
                tech={project.tech}
                paperLink={project.paperLink}
                githubLink={project.githubLink}
                isDataProject={true}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
