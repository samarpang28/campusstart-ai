export function LogoMark({
  size = 32,
  animated = false,
  className = "",
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="CampusStart.AI logo"
    >
      <rect width="32" height="32" rx="8" fill="#14213D" />
      <path
        d="M7 21C10 15 14 10 20 8"
        stroke="#FBF7EF"
        strokeWidth="2"
        strokeDasharray="1 3.2"
        strokeLinecap="round"
        fill="none"
        pathLength={animated ? 300 : undefined}
        className={animated ? "route-line" : ""}
      />
      <circle cx="7" cy="21" r="2.4" fill="#F2A93B" />
      <circle
        cx="21.5"
        cy="8.5"
        r="3.2"
        fill="#1E8F82"
        className={animated ? "logo-pulse" : ""}
      />
      <path
        d="M20 8.5l1 1 2-2"
        stroke="#FBF7EF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({
  size = 28,
  showWordmark = true,
  animated = false,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  animated?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} animated={animated} />
      {showWordmark && (
        <span className="font-display text-xl font-semibold tracking-tight text-ink">
          CampusStart<span className="text-marigold">.AI</span>
        </span>
      )}
    </span>
  );
}
