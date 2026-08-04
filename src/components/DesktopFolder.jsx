import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FolderIcon } from './Icons';

const MotionDiv = motion.div;

export default function DesktopFolder({ label, to, style, delay = 0, rotate = 0 }) {
  const reduce = useReducedMotion();

  return (
    <MotionDiv
      className="desktop-item"
      style={{ ...style, '--icon-rotate': `${rotate}deg` }}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={to} className="desktop-folder">
        <span className="desktop-icon-tilt">
          <FolderIcon size={164} />
        </span>
        <span className="desktop-label">{label}</span>
      </Link>
    </MotionDiv>
  );
}
