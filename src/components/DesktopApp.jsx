import { motion, useReducedMotion } from 'framer-motion';

const MotionDiv = motion.div;

export default function DesktopApp({ label, href, children, style, delay = 0, rotate = 0 }) {
  const reduce = useReducedMotion();

  return (
    <MotionDiv
      className="desktop-item"
      style={{ ...style, '--icon-rotate': `${rotate}deg` }}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={href}
        className="desktop-app"
        target="_blank"
        rel="noreferrer"
        aria-label={label}
      >
        <span className="desktop-icon-tilt">
          <span className="desktop-app-icon">{children}</span>
        </span>
        <span className="desktop-label">{label}</span>
      </a>
    </MotionDiv>
  );
}
