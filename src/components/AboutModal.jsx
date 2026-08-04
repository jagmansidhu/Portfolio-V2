import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import content from '../../content/portfolio-content.json';

const MotionDiv = motion.div;

export default function AboutModal({ open, onClose }) {
  const reduce = useReducedMotion();
  const { person, education } = content;
  const edu = education?.[0];

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <MotionDiv
          className="about-modal-backdrop"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.22 }}
          onClick={onClose}
        >
          <MotionDiv
            className="about-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="about-modal-close" onClick={onClose} aria-label="Close about">
              ×
            </button>

            <p className="about-modal-kicker">{person.kicker}</p>
            <h2 id="about-modal-title" className="about-modal-title">
              {person.name}
            </h2>
            <p className="about-modal-meta">{person.location}</p>
            <p className="about-modal-bio">{person.bio}</p>

            {edu ? (
              <div className="about-modal-edu">
                <p className="about-modal-edu-label">Education</p>
                <p className="about-modal-edu-degree">{edu.degree}</p>
                <p className="about-modal-edu-status">{edu.status}</p>
              </div>
            ) : null}
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
}
