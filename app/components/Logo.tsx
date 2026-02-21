export default function Logo({ size = 'default' }: { size?: 'default' | 'sm' }) {
  const iconSize = size === 'sm' ? 22 : 28;
  const textClass = size === 'sm'
    ? 'font-display text-lg font-bold text-summer-coral'
    : 'font-display text-2xl font-bold text-summer-coral';

  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={iconSize}
        height={iconSize * 0.72}
        viewBox="0 0 56 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Ticket body with notches */}
        <path
          d="M4 0h48a4 4 0 014 4v10a6 6 0 000 12v10a4 4 0 01-4 4H4a4 4 0 01-4-4V26a6 6 0 000-12V4a4 4 0 014-4z"
          fill="#FF6B6B"
        />
        {/* Perforation dashes */}
        <line x1="18" y1="2" x2="18" y2="6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="10" x2="18" y2="14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="18" x2="18" y2="22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="26" x2="18" y2="30" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="34" x2="18" y2="38" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        {/* Music note */}
        <circle cx="34" cy="24" r="4" fill="#fff" />
        <rect x="37.5" y="10" width="2" height="14" rx="1" fill="#fff" />
        <path d="M39.5 10c3-1 6 0 6 3s-3 3-6 2" fill="#fff" />
        {/* Star accent on stub */}
        <path
          d="M9 20l1.5-3 1.5 3 3 .5-2.2 2 .6 3L10.5 24l-2.9 1.5.6-3-2.2-2z"
          fill="#fff"
          opacity="0.7"
        />
      </svg>
      <span className={textClass}>TicéadWatch</span>
    </span>
  );
}
