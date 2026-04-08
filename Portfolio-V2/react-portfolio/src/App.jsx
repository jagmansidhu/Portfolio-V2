import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Project from './components/Project';
import { projects, experience } from './data/content';
import './index.css';

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const items = document.querySelectorAll(".spotlight-item");
      for(const item of items) {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        item.style.setProperty("--mouse-x", `${x}px`);
        item.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="app-container">
      <div className="blob purple"></div>
      <div className="blob cyan"></div>
      
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
            <h1>
              Hi, I'm <span className="text-gradient">Jag.</span>
            </h1>
            <p className="lead">
              3rd year CS Major at University of British Columbia. Building with the end goal of creating a net positive impact.
            </p>
            
            <motion.div 
              className="btn-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* <a href="/assets/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary spotlight-item">
                <span className="btn-content">Resume</span>
              </a> */}
              <a href="mailto:jagmansidhu1@gmail.com" className="btn btn-glass spotlight-item">
                <span className="btn-content">Contact Me</span>
              </a>
              <a href="https://github.com/jagmansidhu" target="_blank" rel="noreferrer" className="btn btn-glass spotlight-item">
                <span className="btn-content">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/jagmans" target="_blank" rel="noreferrer" className="btn btn-glass spotlight-item">
                <span className="btn-content">LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src="/assets/jag.jpg" alt="Jagman Sidhu" className="hero-image" />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-wrapper alternate">
        <div className="section-content">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-gradient"
          >
            Technical Skills
          </motion.h2>

          <div className="skills-grid">
            <motion.div className="glass-panel skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4>Languages</h4>
              <div className="chips">
                {["Java", "TypeScript", "C++", "C", "SQL", "HTML/CSS"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>
            
            <motion.div className="glass-panel skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4>Frameworks & Libraries</h4>
              <div className="chips">
                {["Spring Boot", "Spring Security", "React", "Next.js", "Tailwind CSS"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>

            <motion.div className="glass-panel skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4>Databases & Security</h4>
              <div className="chips">
                {["PostgreSQL", "JWT", "OAuth 2.0", "REST APIs", "WebSocket"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>

            <motion.div className="glass-panel skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <h4>Cloud & DevOps</h4>
              <div className="chips">
                {["AWS (EC2, S3, RDS)", "Docker", "GitHub Actions", "Linux", "Git"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>

            <motion.div className="glass-panel skill-category" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <h4>Tools</h4>
              <div className="chips">
                {["Jira", "Postman", "Maven", "JUnit", "Chai", "Railway"].map(skill => <span className="chip" key={skill}>{skill}</span>)}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-wrapper">
        <div className="section-content">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-gradient"
          >
            Experience
          </motion.h2>
          <div className="items-grid">
            {experience.map((item, id) => (
              <Project 
                key={id}
                title={item.title} 
                subtitle={item.subtitle}
                desc={item.desc}
                tech={item.tech}
                projectLink={item.projectLink}   
                githubLink={item.githubLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-wrapper alternate">
        <div className="section-content">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-gradient"
          >
            Projects
          </motion.h2>
          <div className="items-grid">
            {projects.map((project, id) => (
              <Project 
                key={id}
                title={project.title} 
                subtitle={project.subtitle}
                desc={project.desc}
                tech={project.tech}
                projectLink={project.projectLink}   
                githubLink={project.githubLink}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--glass-border)', marginTop: '4rem', color: 'var(--text-muted)' }}>
        <p>© 2026 Jagman Sidhu. Built with React & Framer Motion.</p>
      </footer>
    </div>
  );
}

export default App;
