import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Desktop from './pages/Desktop';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Books from './pages/Books';
import Data from './pages/Data';
import Music from './pages/Music';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/books" element={<Books />} />
        <Route path="/data" element={<Data />} />
        <Route path="/music" element={<Music />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
