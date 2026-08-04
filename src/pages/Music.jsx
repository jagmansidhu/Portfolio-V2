import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import content from '../../content/portfolio-content.json';
import './Music.css';

const MotionDiv = motion.div;
const TOP_PLAY_COUNT = 5;

export default function Music() {
  const reduce = useReducedMotion();
  const tracks = (content.music?.tracks ?? []).filter((t) => t.cover && t.link);
  const [hoveredId, setHoveredId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const audioRef = useRef(null);
  const queuePosRef = useRef(0);
  const queueRef = useRef([]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    []
  );

  const stopPlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
    setPlaying(false);
    setActiveIndex(-1);
    queueRef.current = [];
    queuePosRef.current = 0;
  };

  const playQueueAt = (pos) => {
    const queue = queueRef.current;
    const audio = audioRef.current;
    if (!audio || pos >= queue.length) {
      stopPlayback();
      return;
    }
    const track = queue[pos];
    queuePosRef.current = pos;
    setActiveIndex(track.index);
    setPlaying(true);
    audio.src = track.preview;
    audio.play().catch(() => stopPlayback());
  };

  const startTopPlay = () => {
    const queue = tracks
      .map((t, index) => ({ ...t, index }))
      .filter((t) => t.preview)
      .slice(0, TOP_PLAY_COUNT);

    if (queue.length === 0) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', () => {
        playQueueAt(queuePosRef.current + 1);
      });
    }

    queueRef.current = queue;
    playQueueAt(0);
  };

  const toggleTopPlay = () => {
    if (playing) stopPlayback();
    else startTopPlay();
  };

  return (
    <main className="listening">
      <header className="listening-top">
        <Link to="/" className="listening-back">
          ← desktop
        </Link>
      </header>

      <MotionDiv
        className="listening-heading"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="listening-title">On repeat.</h1>
        {tracks.some((t) => t.preview) ? (
          <button type="button" className="listening-play" onClick={toggleTopPlay}>
            {playing ? 'pause' : 'play top'}
          </button>
        ) : null}
      </MotionDiv>

      <MotionDiv
        className="listening-body"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="listening-section" aria-labelledby="listening-tracks">
          <h2 id="listening-tracks" className="listening-kicker">
            tracks
          </h2>
          {tracks.length === 0 ? (
            <p className="listening-empty">—</p>
          ) : (
            <ol className="listening-list">
              {tracks.map((track, index) => {
                const id = `${track.title}-${track.artist}`;
                const meta = [track.artist, track.album].filter(Boolean).join(' · ');
                const isHot = hoveredId === id || activeIndex === index;

                return (
                  <li key={id} className={activeIndex === index ? 'is-playing' : undefined}>
                    <a
                      href={track.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`listening-row${isHot ? ' is-hot' : ''}`}
                      onMouseEnter={() => setHoveredId(id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(id)}
                      onBlur={() => setHoveredId(null)}
                    >
                      <span className="listening-cover-wrap" aria-hidden="true">
                        <img src={track.cover} alt="" className="listening-cover" loading="lazy" />
                      </span>
                      <span className="listening-copy">
                        <span className="listening-song">{track.title}</span>
                        <span className="listening-artist">{meta}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </MotionDiv>
    </main>
  );
}
