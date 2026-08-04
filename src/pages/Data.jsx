import FolderPage from './FolderPage';
import content from '../../content/portfolio-content.json';

export default function Data() {
  return (
    <FolderPage
      title="data"
      kicker="opened folder"
      nested={[{ label: 'experience', to: '/experience' }]}
    >
      <ul className="folder-list">
        {content.dataProjects.map((project) => (
          <li key={project.title} className="folder-list-item">
            <h2>{project.title}</h2>
            <p className="folder-meta">{project.subtitle}</p>
            <p>{project.tagline}</p>
            {project.desc.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <div className="folder-links">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer">
                  github ↗
                </a>
              )}
              {project.paperLink && (
                <a href={project.paperLink} target="_blank" rel="noreferrer">
                  paper ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </FolderPage>
  );
}
