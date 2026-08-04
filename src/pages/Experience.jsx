import FolderPage from './FolderPage';
import content from '../../content/portfolio-content.json';

export default function Experience() {
  return (
    <FolderPage title="experience" kicker="opened folder">
      <ul className="folder-list">
        {content.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="folder-list-item">
            <h2>
              {job.role} · {job.company}
            </h2>
            <p className="folder-meta">
              {job.subtitle} · {job.location}
            </p>
            {job.desc.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </li>
        ))}
      </ul>
    </FolderPage>
  );
}
