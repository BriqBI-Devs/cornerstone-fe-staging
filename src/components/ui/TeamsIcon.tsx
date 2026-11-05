/** Microsoft Teams app icon. */
export function TeamsIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="19" cy="6" r="2.4" fill="#5059C9" />
      <path d="M15.5 9.5h5c.83 0 1.5.67 1.5 1.5v5.2a3.8 3.8 0 0 1-3.8 3.8H17" fill="#5059C9" />
      <circle cx="11.5" cy="5.5" r="3.2" fill="#7B83EB" />
      <rect x="1.5" y="8.5" width="13.5" height="13" rx="2.2" fill="#4B53BC" />
      <path d="M5.2 12.8h6.1M8.25 12.8v6" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" fill="none" />
    </svg>
  );
}
