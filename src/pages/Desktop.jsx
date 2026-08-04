import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import DesktopFolder from '../components/DesktopFolder';
import DesktopFile from '../components/DesktopFile';
import DesktopApp from '../components/DesktopApp';
import AboutModal from '../components/AboutModal';

const MotionDiv = motion.div;

const folders = [
  { label: 'experience', to: '/experience', style: { top: '18%', left: '20%' }, delay: 0.18, rotate: -4 },
  { label: 'projects', to: '/projects', style: { bottom: '20%', left: '22%' }, delay: 0.32, rotate: 3 },
  { label: 'library', to: '/books', style: { top: '16%', right: '18%' }, delay: 0.24, rotate: 5 },
  { label: 'data', to: '/data', style: { bottom: '20%', right: '18%' }, delay: 0.38, rotate: -6 },
  { label: 'music', to: '/music', style: { bottom: '18%', left: '58%' }, delay: 0.3, rotate: -3 },
];

export default function Desktop() {
  const reduce = useReducedMotion();
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <main className="desktop">
      <div className="desktop-stage">
        {folders.map((folder) => (
          <DesktopFolder key={folder.to} {...folder} />
        ))}

        <DesktopFile
          src="/assets/MensMentalHealthWeb.png"
          alt="Men's Mental Health Club site"
          filename="mmhc_web.png"
          href="https://ubcmmhc.com/"
          style={{ top: '40%', left: '12%' }}
          delay={0.42}
          rotate={-3}
        />

        <DesktopFile
          src="/assets/TheRoommateWeb.png"
          alt="TheRoommate app"
          filename="theroommate.png"
          href="https://theroommate-production.up.railway.app/"
          style={{ bottom: '16%', left: '34%' }}
          delay={0.48}
          rotate={4}
        />

        <DesktopFile
          src="/assets/7464015829964488032.JPG"
          alt="Jagman Sidhu"
          filename="jagman.jpg"
          style={{ top: '36%', right: '12%' }}
          delay={0.52}
          rotate={7}
          tall
        />

        <DesktopApp
          label="github"
          href="https://github.com/jagmansidhu"
          style={{ top: '17%', left: '34%' }}
          delay={0.2}
          rotate={-2}
        >
          <AppGlyph kind="github" />
        </DesktopApp>

        <DesktopApp
          label="linkedin"
          href="https://linkedin.com/in/jagmans"
          style={{ top: '17%', left: '48%' }}
          delay={0.28}
          rotate={3}
        >
          <AppGlyph kind="linkedin" />
        </DesktopApp>

        <DesktopApp
          label="mail"
          href="mailto:jagmansidhu1@gmail.com"
          style={{ top: '17%', right: '36%' }}
          delay={0.26}
          rotate={-5}
        >
          <AppGlyph kind="mail" />
        </DesktopApp>

        <MotionDiv
          className="desktop-hero"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="desktop-script-heading">
            <button
              type="button"
              className="desktop-script"
              onClick={() => setAboutOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={aboutOpen}
            >
              jagman
            </button>
          </h1>
          <p className="desktop-role">software engineer</p>
        </MotionDiv>
      </div>

      <p className="desktop-credit">
        desktop layout inspired by{' '}
        <a
          href="https://www.behance.net/gallery/239103229/PORTFOLIO-2025-web-design-social-media-design"
          target="_blank"
          rel="noreferrer"
        >
          PORTFOLIO 2025 on Behance
        </a>
      </p>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </main>
  );
}

function AppGlyph({ kind }) {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-5.9c0-1.41-.03-3.22-1.96-3.22-1.96 0-2.26 1.53-2.26 3.12V23h-4V8.5z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  );
}
