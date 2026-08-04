export function FolderIcon({ size = 64, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.82}
      viewBox="0 0 80 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 18c0-3.3 2.7-6 6-6h18.2l5.4 5.5H70c3.3 0 6 2.7 6 6v36c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6V18Z"
        fill="var(--folder-tab)"
      />
      <path
        d="M4 14c0-3.3 2.7-6 6-6h16l4.8 5H10c-3.3 0-6 2.2-6 5.5V14Z"
        fill="var(--folder-face)"
      />
      <path
        d="M4 26c0-3.3 2.7-6 6-6h60c3.3 0 6 2.7 6 6v28c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6V26Z"
        fill="var(--accent)"
      />
      <path
        d="M4 42c0 0 10 8 36 8s36-8 36-8v12c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6V42Z"
        fill="var(--folder-shade)"
        opacity="0.35"
      />
    </svg>
  );
}

export function CursorPointer({ className = '' }) {
  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.2 3.2 5.2 18.4l4-3.5 2.9 6.6 2.6-1.2-2.9-6.5 5.1-.3L5.2 3.2Z"
        fill="var(--cursor-fill)"
        stroke="var(--cursor-stroke)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
