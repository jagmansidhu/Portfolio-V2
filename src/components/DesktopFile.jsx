import { motion, useReducedMotion } from 'framer-motion';

const MotionDiv = motion.div;

export default function DesktopFile({
  src,
  alt,
  filename,
  style,
  delay = 0,
  href,
  rotate = 0,
  tall = false,
}) {
  const reduce = useReducedMotion();

  const inner = (
    <>
      <span className="desktop-icon-tilt">
        <img
          src={src}
          alt={alt}
          className={`desktop-file-thumb${tall ? ' is-tall' : ''}`}
        />
      </span>
      <span className="desktop-label">{filename}</span>
    </>
  );

  return (
    <MotionDiv
      className="desktop-item"
      style={{ ...style, '--icon-rotate': `${rotate}deg` }}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {href ? (
        <a href={href} className="desktop-file" target="_blank" rel="noreferrer">
          {inner}
        </a>
      ) : (
        <div className="desktop-file">{inner}</div>
      )}
    </MotionDiv>
  );
}
