import React from 'react';
import Sidebar from './components/Sidebar';
import Project from './components/Project';
import './index.css';

const projects = [
  {
    title: "Nodify (nwHacks 2026)",
    subtitle: "Jan 2026",
    desc: [
      "An intelligent email management system that uses the Gemini API to analyze, categorize, and score emails by urgency, with a visual dashboard for tracking trends across topics like security, meetings, and bills."
    ],
    tech: ["Next.js", "Gemini API", "TypeScript"]
  },
  {
    githubLink: "https://github.com/jagmansidhu/DaRoommate",
    title: "DaRoommate",
    subtitle: "Aug 2025 – Present",
    desc: [
      "A housing management web app that automates expense splitting and landlord communication, featuring real-time WebSocket notifications, secure S3 document storage, and an AWS RDS-backed data layer with automated disaster recovery."
    ],
    tech: ["Spring Boot", "TypeScript", "React", "PostgreSQL", "Docker", "AWS", "WebSocket"]
  },
  {
    githubLink: "https://github.com/jagmansidhu/Lumina",
    title: "Lumina",
    subtitle: "Jun 2025 – Aug 2025",
    desc: [
      "An NLP-powered mental health screening platform that uses fine-tuned Transformer models to classify user sentiment and identify intents, providing a low-friction entry point for individuals seeking initial support."
    ],
    tech: ["Python", "Pandas", "Numpy", "Transformers"]
  }
];

const experience = [
  {
    projectLink: "https://ubcmmhc.com/", 
    githubLink: "https://github.com/UBC-MMHC",
    title: "Software Developer | Mens Mental Health Club",
    subtitle: "Sept 2025 – Present · Vancouver, BC",
    desc: [
      "Built a full-stack community platform for 65+ members, featuring Stripe-powered membership checkout, an admin dashboard for managing events and finances, and a secure authentication system with JWT and Google OAuth."
    ],
    tech: ["Spring Boot", "Next.js", "PostgreSQL", "REST APIs", "Java", "TypeScript"]
  },
  {
    title: "IT Support Specialist | SSL Computers",
    subtitle: "Jan 2023 – Jun 2023 · Calgary, AB",
    desc: [
      "Provided end-to-end hardware repair and network support, improving diagnostic turnaround by 40% through custom PowerShell and Bash automation scripts while providing excelent service to customers."
    ],
    tech: ["Linux", "MacOS", "Windows", "PowerShell", "Bash"]
  }
];

function App() {
  return (
    <div className="content">
      <Sidebar />
      <nav className="main">
        <div className="container">
          {/* Home Section */}
          <section id="home">
            <main className="fold-content-container">
              <div className="fold-content">
                <div className="hero-intro">
                  <div className="hero-text">
                    <h1>Hi, I'm Jag.<br /></h1>
                    <p className="lead">
                      3rd year CS Major at University of British Columbia.
                      <br />
                      Building with the end goal of helping others
                    </p>
                  </div>
                </div>
              </div>
              <div className="button-group">
                <a href="mailto:jagmansidhu1@gmail.com" className="button w-button">
                  <img src="/assets/gmail.svg" alt="" className="button-icon" />
                  Contact
                </a>

                <a href="https://github.com/jagmansidhu" target="_blank" rel="noreferrer" className="button w-button">
                  <img src="/assets/github.svg" alt="" className="button-icon" />
                  GitHub
                </a>

                <a href="https://linkedin.com/in/jagmans" target="_blank" rel="noreferrer" className="button w-button">
                  <img src="/assets/icons8-linkedin.svg" alt="" className="button-icon" />
                  LinkedIn
                </a>
              </div>
            </main>
          </section>

          {/* Technical Skills Section */}
          <section id="skills">
            <div className="content-container">
              <h2 className="section-title">Technical Skills</h2>

              <div className="skills-category">
                <div className="mini-label-white">Languages</div>
                <div className="chips-container">
                  <div className="single-chip">Java</div>
                  <div className="single-chip">TypeScript</div>
                  <div className="single-chip">C++</div>
                  <div className="single-chip">C</div>
                  <div className="single-chip">SQL</div>
                  <div className="single-chip">HTML/CSS</div>
                </div>
              </div>

              <div className="skills-category">
                <div className="mini-label-white">Frameworks & Libraries</div>
                <div className="chips-container">
                  <div className="single-chip">Spring Boot</div>
                  <div className="single-chip">Spring Security</div>
                  <div className="single-chip">React</div>
                  <div className="single-chip">Next.js</div>
                  <div className="single-chip">Tailwind CSS</div>
                </div>
              </div>

              <div className="skills-category">
                <div className="mini-label-white">Databases & Security</div>
                <div className="chips-container">
                  <div className="single-chip">PostgreSQL</div>
                  <div className="single-chip">JWT</div>
                  <div className="single-chip">OAuth 2.0</div>
                  <div className="single-chip">REST APIs</div>
                  <div className="single-chip">WebSocket</div>
                </div>
              </div>

              <div className="skills-category">
                <div className="mini-label-white">Cloud & DevOps</div>
                <div className="chips-container">
                  <div className="single-chip">AWS (EC2, S3, RDS)</div>
                  <div className="single-chip">Docker</div>
                  <div className="single-chip">GitHub Actions</div>
                  <div className="single-chip">Linux</div>
                  <div className="single-chip">Git</div>
                </div>
              </div>

              <div className="skills-category">
                <div className="mini-label-white">Tools</div>
                <div className="chips-container">
                  <div className="single-chip">Jira</div>
                  <div className="single-chip">Postman</div>
                  <div className="single-chip">Maven</div>
                  <div className="single-chip">JUnit</div>
                  <div className="single-chip">Chai</div>
                  <div className="single-chip">Railway</div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience">
            <div className="content-container">
              <h2 className="section-title">Experience</h2>
              <div className="resouce-items">
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
          <section id="projects">
            <div className="content-container">
              <h2 className="section-title">Projects</h2>
              <div className="resouce-items">
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
        </div>
      </nav>
    </div>
  );
}

export default App;
