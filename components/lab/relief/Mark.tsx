// Le « A » d'Atlas dessiné comme un sommet en courbes de niveau.
const OUTER: [number, number][] = [
  [50, 6],
  [94, 90],
  [6, 90],
];
const CENTER: [number, number] = [52, 30];

function ring(k: number) {
  const pts = OUTER.map(([x, y]) => [
    CENTER[0] + (x - CENTER[0]) * k,
    CENTER[1] + (y - CENTER[1]) * k,
  ]);
  return `M${pts.map((p) => p.map((n) => n.toFixed(2)).join(" ")).join(" L")} Z`;
}

export function ReliefMark({
  size = 40,
  stroke = 7,
  className,
}: {
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 96"
      width={size}
      height={size * 0.96}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinejoin="round"
    >
      <path d={ring(1)} />
      <path d={ring(0.62)} />
      <path d={ring(0.26)} />
    </svg>
  );
}
