import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimate, useReducedMotion } from 'framer-motion';
import content from '../../content/portfolio-content.json';
import './Books.css';

const MotionDiv = motion.div;
const MotionSpan = motion.span;

const STATUS_LABEL = {
  reading: 'currently reading',
  read: 'read',
  want: 'want to read',
};

const HOVER_PICK_MS = 500;
const HOVER_LEAVE_MS = 180;
/** open→spine + hold + spine→shelf */
const PUT_AWAY_MS = 700;

const POSES = {
  shelved: { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
  open: { x: 0, y: -14, z: 120, rotateX: 7, rotateY: -76, rotateZ: -4 },
  spine: { x: 0, y: -10, z: 100, rotateX: 0, rotateY: 0, rotateZ: 0 },
};

const MUTED_SPINES = [
  '#C47A5A',
  '#D4A84B',
  '#6A8E8F',
  '#E6D7C3',
  '#B86B4B',
  '#8FA3A0',
  '#C9A66B',
  '#5E7A78',
  '#D9C4A8',
  '#A56B52',
  '#7B8F6E',
  '#C48B5C',
  '#4F6F8F',
  '#8B5E3C',
];

export default function Books() {
  const reduce = useReducedMotion();
  const [view, setView] = useState('shelves');
  const [activeId, setActiveId] = useState(null);
  const [closingId, setClosingId] = useState(null);
  const hoverTimer = useRef(null);
  const pendingId = useRef(null);
  const activeIdRef = useRef(null);
  const closingIdRef = useRef(null);

  useEffect(() => () => clearHoverTimer(hoverTimer), []);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    closingIdRef.current = closingId;
  }, [closingId]);

  const books = (content.books ?? []).map((book, i) => {
    const displayColor = MUTED_SPINES[i % MUTED_SPINES.length];
    return {
      ...book,
      displayColor,
      ink: contrastInk(displayColor),
    };
  });

  const reading = books.filter((b) => b.status === 'reading');
  const read = sortReadNewestFirst(books.filter((b) => b.status === 'read'));
  const want = books.filter((b) => b.status === 'want');
  const nowNext = [...reading, ...want];

  const switchView = (next) => {
    if (next === view) return;
    clearHoverTimer(hoverTimer);
    pendingId.current = null;
    setActiveId(null);
    setClosingId(null);
    setView(next);
  };

  const putBookAway = (id) => {
    if (!id) return;
    if (reduce) {
      setActiveId(null);
      setClosingId(null);
      return;
    }
    setActiveId(null);
    setClosingId(id);
  };

  const handleShelved = (id) => {
    if (closingIdRef.current === id) setClosingId(null);
  };

  const activateBook = (id) => {
    clearHoverTimer(hoverTimer);
    pendingId.current = id;

    if (reduce) {
      setClosingId(null);
      setActiveId(id);
      return;
    }

    if (activeIdRef.current === id) return;

    const wasHolding = activeIdRef.current != null || closingIdRef.current != null;

    if (activeIdRef.current != null) {
      putBookAway(activeIdRef.current);
    }

    const waitForClose = wasHolding ? PUT_AWAY_MS : 0;

    hoverTimer.current = setTimeout(() => {
      if (pendingId.current !== id) return;

      const tryPick = () => {
        if (pendingId.current !== id) return;
        if (closingIdRef.current) {
          hoverTimer.current = setTimeout(tryPick, 40);
          return;
        }
        setActiveId(id);
        hoverTimer.current = null;
      };

      tryPick();
    }, HOVER_PICK_MS + waitForClose);
  };

  const pickBookNow = (id) => {
    clearHoverTimer(hoverTimer);
    pendingId.current = id;
    setClosingId(null);
    setActiveId(id);
  };

  const releaseBook = () => {
    pendingId.current = null;
    clearHoverTimer(hoverTimer);

    if (reduce) {
      setActiveId(null);
      setClosingId(null);
      return;
    }

    hoverTimer.current = setTimeout(() => {
      if (pendingId.current != null) return;
      if (activeIdRef.current) putBookAway(activeIdRef.current);
      hoverTimer.current = null;
    }, HOVER_LEAVE_MS);
  };

  return (
    <main className="library">
      <header className="library-top">
        <Link to="/" className="library-back">
          ← desktop
        </Link>
        <div className="library-view-toggle" role="group" aria-label="Library view">
          <button
            type="button"
            className={`library-view-btn${view === 'shelves' ? ' is-active' : ''}`}
            aria-pressed={view === 'shelves'}
            onClick={() => switchView('shelves')}
          >
            shelves
          </button>
          <span className="library-view-sep" aria-hidden="true">
            /
          </span>
          <button
            type="button"
            className={`library-view-btn${view === 'list' ? ' is-active' : ''}`}
            aria-pressed={view === 'list'}
            onClick={() => switchView('list')}
          >
            list
          </button>
        </div>
      </header>

      <MotionDiv
        className="library-heading"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="library-title">My reads</h1>
      </MotionDiv>

      {view === 'list' ? (
        <BooksList read={read} nowNext={nowNext} />
      ) : (
        <div className="library-room">
          <Shelf
            flag="Read"
            flagTone="read"
            hint="most recently read on left"
            books={read}
            activeId={activeId}
            closingId={closingId}
            onActivate={activateBook}
            onPickNow={pickBookNow}
            onRelease={releaseBook}
            onShelved={handleShelved}
            reduce={reduce}
          />

          <Shelf
            hoverFlags
            books={nowNext}
            activeId={activeId}
            closingId={closingId}
            onActivate={activateBook}
            onPickNow={pickBookNow}
            onRelease={releaseBook}
            onShelved={handleShelved}
            reduce={reduce}
          />
        </div>
      )}
    </main>
  );
}

function BooksList({ read, nowNext }) {
  return (
    <div className="library-list-room">
      <ListSection flag="Read" flagTone="read" books={read} />
      <ListSection
        flag="Now & next"
        books={nowNext}
        showStatus
      />
    </div>
  );
}

function ListSection({ flag, flagTone, books, showStatus = false }) {
  return (
    <section className="library-list-section" aria-label={flag}>
      <div className="library-section-head">
        <div className="library-flags">
          <span className={`library-flag${flagTone ? ` library-flag-${flagTone}` : ''}`}>
            <FlagIcon />
            <span>{flag}</span>
          </span>
        </div>
      </div>
      {books.length === 0 ? (
        <p className="library-list-empty">Nothing here yet</p>
      ) : (
        <ul className="library-plain-list">
          {books.map((book) => (
            <li key={bookKey(book)} className="library-plain-item">
              <span className="library-plain-title">{book.title}</span>
              {book.author ? (
                <span className="library-plain-author">{book.author}</span>
              ) : null}
              {showStatus ? (
                <span className={`library-plain-status library-plain-status-${book.status}`}>
                  {STATUS_LABEL[book.status]}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Shelf({
  flag,
  flagTone,
  flags,
  hoverFlags = false,
  hint,
  books,
  activeId,
  closingId,
  onActivate,
  onPickNow,
  onRelease,
  onShelved,
  reduce,
}) {
  const flagItems = flags ?? (flag ? [{ label: flag, tone: flagTone }] : []);
  const ariaLabel = hoverFlags
    ? 'Reading and want to read'
    : flagItems.map((f) => f.label).join(' & ');

  return (
    <section className="library-bay" aria-label={ariaLabel}>
      {(flagItems.length > 0 || hint) && !hoverFlags ? (
        <div className="library-section-head">
          <div className="library-flags">
            {flagItems.map((item, index) => (
              <span key={item.label} className="library-flag-group">
                {index > 0 ? <span className="library-flag-join">·</span> : null}
                <span className={`library-flag library-flag-${item.tone}`}>
                  <FlagIcon />
                  <span>{item.label}</span>
                </span>
              </span>
            ))}
          </div>
          {hint ? <span className="library-section-hint">{hint}</span> : null}
        </div>
      ) : null}

      <div className="library-scroll">
        <ul className="library-row" onMouseLeave={onRelease}>
          {books.length === 0 ? (
            <li className="library-empty-shelf">Nothing here yet</li>
          ) : (
            books.map((book, i) => (
              <BookBlock
                key={bookKey(book)}
                book={book}
                active={activeId === bookKey(book)}
                closing={closingId === bookKey(book)}
                onActivate={onActivate}
                onPickNow={onPickNow}
                onShelved={onShelved}
                delay={reduce ? 0 : i * 24}
                hoverFlag={hoverFlags}
                reduce={reduce}
              />
            ))
          )}
        </ul>
      </div>
      <div className="library-board" aria-hidden="true" />
      <div className="library-shelf-shadow" aria-hidden="true" />
    </section>
  );
}

function FlagIcon() {
  return (
    <svg className="library-flag-mark" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 1.5h1.25v13H3V1.5zm1.75 0H13l-1.4 3.4L13 8.3H4.75V1.5z"
      />
    </svg>
  );
}

function BookBlock({
  book,
  active,
  closing,
  onActivate,
  onPickNow,
  onShelved,
  delay = 0,
  hoverFlag = false,
  reduce = false,
}) {
  const id = bookKey(book);
  const spineWidth = Math.max(Math.round((book.width ?? 34) * 1.35), 46);
  const spineHeight = 250;
  const hoverFlagMeta = HOVER_FLAGS[book.status];
  const raised = active || closing;
  const [scope, animate] = useAnimate();
  const runId = useRef(0);
  const onShelvedRef = useRef(onShelved);

  useEffect(() => {
    onShelvedRef.current = onShelved;
  }, [onShelved]);

  useEffect(() => {
    const myRun = ++runId.current;
    let cancelled = false;

    async function runPose() {
      const node = scope.current;
      if (!node) return;

      if (reduce) {
        await animate(node, active ? POSES.open : POSES.shelved, { duration: 0 });
        await animate('.library-cover-visual', { opacity: active ? 1 : 0 }, { duration: 0 });
        if (closing && !cancelled && runId.current === myRun) onShelvedRef.current?.(id);
        return;
      }

      if (active) {
        // Cover reveals with the turn — don’t wait for the pull to finish
        animate('.library-cover-visual', { opacity: 1 }, { duration: 0.22, ease: 'easeOut', delay: 0.06 });
        await animate(node, POSES.open, {
          duration: 0.4,
          ease: [0.22, 0.61, 0.36, 1],
        });
        return;
      }

      if (closing) {
        animate('.library-cover-visual', { opacity: 0 }, { duration: 0.2, ease: 'easeOut' });
        await animate(node, POSES.spine, {
          duration: 0.24,
          ease: [0.33, 0, 0.2, 1],
        });
        if (cancelled || runId.current !== myRun) return;

        await wait(100);
        if (cancelled || runId.current !== myRun) return;

        await animate(node, POSES.shelved, {
          duration: 0.36,
          ease: [0.22, 0.61, 0.36, 1],
        });
        if (!cancelled && runId.current === myRun) onShelvedRef.current?.(id);
        return;
      }

      await animate(node, POSES.shelved, { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] });
      await animate('.library-cover-visual', { opacity: 0 }, { duration: 0.12 });
    }

    runPose();
    return () => {
      cancelled = true;
    };
  }, [active, closing, reduce, id, animate, scope]);

  return (
    <li className={`library-slot${raised ? ' is-raised' : ''}`}>
      <button
        type="button"
        className={`library-book${active ? ' is-active' : ''}${closing ? ' is-closing' : ''}${book.status === 'reading' ? ' is-reading' : ''}`}
        style={{
          '--book': book.displayColor,
          '--ink': book.ink,
          '--book-h': `${spineHeight}px`,
          '--book-w': `${spineWidth}px`,
          animationDelay: `${delay}ms`,
        }}
        aria-label={`${book.title}${book.author ? ` by ${book.author}` : ''}, ${STATUS_LABEL[book.status]}`}
        onMouseEnter={() => onActivate(id)}
        onFocus={() => onPickNow(id)}
      >
        <MotionSpan
          ref={scope}
          className="library-book-3d"
          initial={POSES.shelved}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left bottom',
            transformPerspective: 1100,
          }}
        >
          <span className="library-spine">
            <span className="library-spine-band" aria-hidden="true" />
            <span className="library-spine-title">{book.title}</span>
            {book.author ? <span className="library-spine-author">{shortAuthor(book.author)}</span> : null}
            <span className="library-spine-foot" aria-hidden="true" />
          </span>

          <span className="library-cover-face library-cover-visual" aria-hidden="true">
            {book.cover ? (
              <img
                src={book.cover}
                alt=""
                className="library-cover-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : null}
            <span className="library-cover-fallback" style={{ background: book.displayColor, color: book.ink }}>
              <strong>{book.title}</strong>
              {book.author ? <em>{book.author}</em> : null}
            </span>
          </span>

          <span className="library-page-edge" aria-hidden="true" />
        </MotionSpan>

        {active && hoverFlag && hoverFlagMeta ? (
          <span className={`library-hover-flag library-flag library-flag-${hoverFlagMeta.tone}`}>
            <FlagIcon />
            <span>{hoverFlagMeta.label}</span>
          </span>
        ) : null}
      </button>
    </li>
  );
}

const HOVER_FLAGS = {
  reading: { label: 'Reading', tone: 'reading' },
  want: { label: 'Want to read', tone: 'want' },
  read: { label: 'Read', tone: 'read' },
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearHoverTimer(ref) {
  if (ref.current) {
    clearTimeout(ref.current);
    ref.current = null;
  }
}

function bookKey(book) {
  return `${book.title}-${book.author || 'unknown'}`;
}

function sortReadNewestFirst(list) {
  return [...list].sort((a, b) => {
    const yearDiff = (b.year ?? 0) - (a.year ?? 0);
    if (yearDiff !== 0) return yearDiff;
    return a.title.localeCompare(b.title);
  });
}

function shortAuthor(author) {
  const parts = author.split(/\s+/);
  if (parts.length === 1) return author;
  return parts[parts.length - 1];
}

function contrastInk(hex) {
  const raw = hex.replace('#', '');
  const n = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luma > 0.55 ? '#2A241C' : '#F7F1E8';
}
