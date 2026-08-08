const PALETTES: Record<string, string[]> = {
  default: ["#14213D", "#243158", "#C97A1A"],
};

export default function CityIllustration({ city, className = "" }: { city: string; className?: string }) {
  const colors = PALETTES.default;
  const seed = city.length;
  const heights = [24, 38, 30, 44, 26, 34].map((h, i) => h + ((seed + i) % 5) * 3);

  return (
    <svg viewBox="0 0 200 70" className={className} role="img" aria-label={`${city} skyline illustration`}>
      <rect x="0" y="0" width="200" height="70" fill="#F3EEE1" />
      {heights.map((h, i) => (
        <rect
          key={i}
          x={10 + i * 32}
          y={60 - h}
          width="22"
          height={h}
          fill={i % 2 === 0 ? colors[0] : colors[1]}
        />
      ))}
      <rect x="0" y="60" width="200" height="4" fill={colors[2]} />
    </svg>
  );
}
