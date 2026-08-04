import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import content from '../../content/portfolio-content.json';
import './Music.css';

const MotionDiv = motion.div;

export default function Music() {
  const reduce = useReducedMotion();
  const tracks = content.music?.tracks ?? [];
  const artists = content.music?.artists ?? [];

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
        <h1 className="listening-title">Listening to.</h1>
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
              {tracks.map((track) => (
                <li key={`${track.title}-${track.artist}`}>
                  {track.link ? (
                    <a href={track.link} target="_blank" rel="noreferrer" className="listening-row">
                      <span className="listening-song">{track.title}</span>
                      <span className="listening-artist">{track.artist}</span>
                    </a>
                  ) : (
                    <div className="listening-row">
                      <span className="listening-song">{track.title}</span>
                      <span className="listening-artist">{track.artist}</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="listening-section" aria-labelledby="listening-artists">
          <h2 id="listening-artists" className="listening-kicker">
            artists
          </h2>
          {artists.length === 0 ? (
            <p className="listening-empty">—</p>
          ) : (
            <ul className="listening-list listening-list-plain">
              {artists.map((artist) => (
                <li key={artist.name ?? artist}>
                  {typeof artist === 'string' ? (
                    <span className="listening-song">{artist}</span>
                  ) : artist.link ? (
                    <a href={artist.link} target="_blank" rel="noreferrer" className="listening-row">
                      <span className="listening-song">{artist.name}</span>
                    </a>
                  ) : (
                    <span className="listening-song">{artist.name}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </MotionDiv>
    </main>
  );
}
