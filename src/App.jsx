import React from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/Sidebar';
import Project from './components/Project';
import FeaturedCarousel from './components/FeaturedCarousel';
import { projects, experience } from './data/content';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      
      {/* Home / Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="kicker">University of British Columbia</div>
            <h1 className="hero-display">
              Hi, I'm <span className="text-mint">Jag.</span>
            </h1>
            <p className="lead">
              3rd year CS Major based in Vancouver. Building to create a net positive impact and mastering the craft of software engineering. Currently a Full-Stack Web Developer using Java, React, Typescript and SQL. Outside of coding, I love reading, weightlifting (225lb bench press), and building new projects.
            </p>
            
            <motion.div 
              className="btn-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <a href="mailto:jagmansidhu1@gmail.com" className="btn btn-primary">
                Contact Me
              </a>
              <a href="https://github.com/jagmansidhu" target="_blank" rel="noreferrer" className="btn btn-secondary">
                GitHub ↗
              </a>
              <a href="https://linkedin.com/in/jagmans" target="_blank" rel="noreferrer" className="btn btn-secondary">
                LinkedIn ↗
              </a>
            </motion.div>


          </motion.div>
          
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img src="/assets/7464015829964488032.JPG" alt="Jagman Sidhu" className="hero-image" />
          </motion.div>

        </div>
      </section>

      {/* Featured / Currently Working On Section */}
      <section id="featured" className="section-wrapper" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="section-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <FeaturedCarousel />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-wrapper">
        <div className="section-content">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            TECHNICAL EXPERIENCE
          </motion.h2>
          <p className="section-lead">
            Software development and IT roles.
          </p>
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

      {/* Projects Section */}
      <section id="projects" className="section-wrapper">
        <div className="section-content">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            PROJECTS
          </motion.h2>
          <p className="section-lead">
            Hackathon builds and personal projects with live demos or public repos.
          </p>
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

      {/* Skills Section */}
      <section id="skills" className="section-wrapper">
        <div className="section-content">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            TECHNICAL SKILLS
          </motion.h2>

          <div className="skills-grid">
            <motion.div className="skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4>LANGUAGES</h4>
              <div className="chips">
                {["Java", "TypeScript", "C++", "C", "SQL", "HTML/CSS"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>
            
            <motion.div className="skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4>FRAMEWORKS</h4>
              <div className="chips">
                {["Spring Boot", "Spring Security", "React", "Next.js", "Tailwind CSS"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>

            <motion.div className="skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4>DATABASES & SEC</h4>
              <div className="chips">
                {["PostgreSQL", "JWT", "OAuth 2.0", "REST APIs", "WebSocket"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>

            <motion.div className="skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <h4>CLOUD & DEVOPS</h4>
              <div className="chips">
                {["AWS (EC2, S3, RDS)", "Docker", "GitHub Actions", "Linux", "Git"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>

            <motion.div className="skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <h4>TOOLS</h4>
              <div className="chips">
                {["Jira", "Postman", "Maven", "JUnit", "Chai", "Railway"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--surface-slate)', padding: '4rem 2rem', textAlign: 'center' }}>
        <p className="mono-label text-muted" style={{ fontSize: '12px' }}>© 2026 JAGMAN SIDHU. BUILT WITH REACT.</p>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
