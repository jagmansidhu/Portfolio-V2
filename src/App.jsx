import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Data from './pages/Data';
import './index.css';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === '/' && hash) {
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <div className="app-container">
      <ScrollManager />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/data" element={<Data />} />
      </Routes>

      <footer style={{ borderTop: '1px solid var(--surface-slate)', padding: '4rem 2rem', textAlign: 'center' }}>
        <p className="mono-label text-muted" style={{ fontSize: '12px' }}>© 2026 JAGMAN SIDHU. BUILT WITH REACT.</p>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
