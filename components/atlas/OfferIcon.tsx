// Pictogrammes des deux offres, dans la grammaire du logo : des courbes de
// niveau qui se resserrent vers un sommet, et la balise jaune au point haut.

type Kind = "site" | "product";

const STROKE = 2.2;

/** Contour mis à l'échelle autour d'un sommet, comme les anneaux du logo. */
function Ring({
  d,
  k,
  cx,
  cy,
  fill,
}: {
  d: string;
  k: number;
  cx: number;
  cy: number;
  fill?: string;
}) {
  return (
    <path
      d={d}
      fill={fill}
      transform={`translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})`}
      strokeWidth={STROKE / k}
    />
  );
}

// Votre site : un repère posé sur la carte.
const PIN = "M32 57 C22 45 13 36 13 25 A19 19 0 0 1 51 25 C51 36 42 45 32 57 Z";

// Votre produit : des strates de relief empilées.
const LAYER = "M32 10 L56 22 L32 34 L8 22 Z";

export function OfferIcon({
  kind,
  size = 80,
  className,
}: {
  kind: Kind;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {kind === "site" ? (
        <>
          <ellipse cx={32} cy={57} rx={27} ry={5.5} opacity={0.3} />
          <ellipse cx={32} cy={57} rx={15} ry={2.8} opacity={0.55} />
          <Ring d={PIN} k={1} cx={32} cy={24} fill="var(--icon-bg, #fff)" />
          <Ring d={PIN} k={0.62} cx={32} cy={24} />
          <circle cx={32} cy={24} r={5} fill="var(--beacon)" />
        </>
      ) : (
        <>
          <path d="M8 42 L32 54 L56 42" opacity={0.45} />
          <path d="M8 32 L32 44 L56 32" />
          <path d={LAYER} />
          <Ring d={LAYER} k={0.42} cx={32} cy={22} fill="var(--beacon)" />
        </>
      )}
    </svg>
  );
}
