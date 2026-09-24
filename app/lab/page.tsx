import Link from "next/link";

const pistes = [
  {
    href: "/lab/relief",
    name: "Relief",
    idea: "Atlas pris au mot : des courbes de niveau vivantes, un bleu cartographe franc. « Mettez votre activité sur la carte. »",
    bg: "#1F3BD9",
    fg: "#fff",
  },
  {
    href: "/lab/nocturne",
    name: "Nocturne",
    idea: "Le travail d’abord : noir, typographie géante qui s’étire, zéro décoration. Les projets apportent la couleur.",
    bg: "#0A0A0B",
    fg: "#EDEBE6",
  },
  {
    href: "/lab/atelier",
    name: "Atelier",
    idea: "Fait main : du croquis au site, un poinçon d’artisan, des aplats sapin et soleil. Chaleureux et affirmé.",
    bg: "#16382C",
    fg: "#FFC53D",
  },
];

export default function Lab() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", fontFamily: "system-ui, sans-serif" }}>
      {pistes.map((p) => (
        <Link
          key={p.href}
          href={p.href}
          style={{ background: p.bg, color: p.fg, padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 420, textDecoration: "none" }}
        >
          <span style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {p.name}
          </span>
          <span style={{ fontSize: 18, lineHeight: 1.5, maxWidth: "34ch" }}>{p.idea}</span>
        </Link>
      ))}
    </main>
  );
}
