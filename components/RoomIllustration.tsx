export default function RoomIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={className} role="img" aria-label="Illustrated room">
      <rect x="0" y="0" width="200" height="90" fill="#F3EEE1" />
      <rect x="0" y="70" width="200" height="20" fill="#e3ddcb" />
      <rect x="20" y="14" width="42" height="34" fill="#fff" stroke="#14213D" strokeWidth="2" />
      <line x1="41" y1="14" x2="41" y2="48" stroke="#14213D" strokeWidth="1.5" />
      <line x1="20" y1="31" x2="62" y2="31" stroke="#14213D" strokeWidth="1.5" />
      <rect x="90" y="40" width="60" height="30" fill="#fff" stroke="#14213D" strokeWidth="2" />
      <rect x="90" y="32" width="60" height="8" fill="#C97A1A" />
      <rect x="140" y="14" width="28" height="18" fill="#1E8F82" opacity="0.25" />
      <rect x="140" y="14" width="28" height="18" fill="none" stroke="#1E8F82" strokeWidth="2" />
    </svg>
  );
}
