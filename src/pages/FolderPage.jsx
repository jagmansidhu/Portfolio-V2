import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderIcon } from '../components/Icons';

const MotionDiv = motion.div;

export default function FolderPage({ title, kicker, nested = [], children }) {
  const reduce =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <main className="folder-page">
      <header className="folder-page-header">
        <Link to="/" className="folder-back">
          ← desktop
        </Link>
        <div className="folder-page-brand">
          <FolderIcon size={36} />
          <div>
            <p className="folder-kicker">{kicker}</p>
            <h1 className="folder-title">{title}</h1>
          </div>
        </div>
      </header>

      <MotionDiv
        className="folder-page-body"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
      >
        {children}
        {nested.length > 0 && (
          <nav className="folder-nested" aria-label="folders inside">
            {nested.map((folder) => (
              <Link key={folder.to} to={folder.to} className="folder-nested-item">
                <FolderIcon size={52} />
                <span>{folder.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </MotionDiv>
    </main>
  );
}
