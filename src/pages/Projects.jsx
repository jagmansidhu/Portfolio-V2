import FolderPage from './FolderPage';
import content from '../../content/portfolio-content.json';

export default function Projects() {
  return (
    <FolderPage
      title="projects"
      kicker="opened folder"
      nested={[
        { label: 'data', to: '/data' },
        { label: 'experience', to: '/experience' },
      ]}
    >
      <ul className="folder-list">
        {content.projects.map((project) => (
          <li key={project.title} className="folder-list-item">
            <h2>{project.title}</h2>
            <p className="folder-meta">
              {project.subtitle}
              {project.subtitleBold ? project.subtitleBold : ''}
            </p>
            <p>{project.tagline}</p>
            {project.desc.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <div className="folder-links">
              {project.projectLink && (
                <a href={project.projectLink} target="_blank" rel="noreferrer">
                  live ↗
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer">
                  github ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </FolderPage>
  );
}
