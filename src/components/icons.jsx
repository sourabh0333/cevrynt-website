export function ChevronDown({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="m3 5 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const signalDots = [
  [18, 2], [18, 10], [18, 18], [18, 26], [18, 34],
  [2, 18], [10, 18], [26, 18], [34, 18],
  [10, 10], [26, 10], [10, 26], [26, 26],
];

export function SignalMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 36 36" aria-hidden="true">
      {signalDots.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.35" />)}
    </svg>
  );
}

export function ArrowRight({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
