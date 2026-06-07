import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Hide standard cursor
    document.body.style.cursor = 'none';
    
    // Make sure pointer elements like buttons still have pointers if we don't want to hide them entirely,
    // but hiding it on body usually overrides it. We can re-hide it explicitly if needed.
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.head.removeChild(style);
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Variants for smooth trailing
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 30
      }
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      transition: {
        type: "spring",
        mass: 0.05,
        stiffness: 1000,
        damping: 20
      }
    }
  };

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        variants={variants}
        animate="default"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid var(--accent-cyan)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.8
        }}
      />
      {/* Inner Dot */}
      <motion.div
        variants={dotVariants}
        animate="default"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-cyan)',
          pointerEvents: 'none',
          zIndex: 10000
        }}
      />
    </>
  );
}
