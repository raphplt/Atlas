"use client";
import { useId, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// ---------- Trait « fait main » déterministe ----------
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647 - 0.5;
  };
}
function rough(x1: number, y1: number, x2: number, y2: number, seed: number, j = 5) {
  const r = rng(seed);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const k = Math.min(j, len / 20);
  const mx = (x1 + x2) / 2 + r() * k * 2;
  const my = (y1 + y2) / 2 + r() * k * 2;
  return `M${(x1 + r() * k).toFixed(1)} ${(y1 + r() * k).toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${(x2 + r() * k).toFixed(1)} ${(y2 + r() * k).toFixed(1)}`;
}
function rect(x: number, y: number, w: number, h: number, seed: number) {
  return [
    rough(x - 4, y, x + w + 4, y, seed),
    rough(x + w, y - 4, x + w, y + h + 4, seed + 1),
    rough(x + w + 4, y + h, x - 4, y + h, seed + 2),
    rough(x, y + h + 4, x, y - 4, seed + 3),
  ];
}
function scribble(x: number, y: number, w: number, seed: number, amp = 5) {
  const r = rng(seed);
  const n = Math.max(2, Math.round(w / 60));
  let d = `M${x} ${y}`;
  for (let i = 1; i <= n; i++) {
    const px = x + (w * i) / n;
    d += ` Q${(px - w / n / 2).toFixed(1)} ${(y + (i % 2 ? -amp : amp) + r() * 3).toFixed(1)} ${px.toFixed(1)} ${(y + r() * 3).toFixed(1)}`;
  }
  return d;
}

// Wireframe calqué sur la vraie page d'accueil de Permapaysage (1600 × 920).
const SKETCH: { d: string; w: number }[] = [
  { d: rough(0, 66, 1600, 66, 1), w: 3 },
  ...[
    "M186 32 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0",
  ].map((d) => ({ d, w: 3 })),
  { d: scribble(234, 32, 110, 2, 3), w: 5 },
  ...[
    [586, 48],
    [667, 100],
    [801, 78],
    [911, 28],
    [971, 54],
  ].map(([x, w], i) => ({ d: scribble(x, 32, w, 10 + i, 2), w: 4 })),
  ...rect(1265, 12, 151, 40, 20).map((d) => ({ d, w: 3 })),
  ...rect(184, 193, 258, 30, 30).map((d) => ({ d, w: 2.5 })),
  { d: scribble(186, 292, 560, 40, 8), w: 22 },
  { d: scribble(186, 356, 440, 41, 8), w: 22 },
  { d: scribble(186, 420, 470, 42, 8), w: 22 },
  { d: scribble(186, 494, 520, 43, 3), w: 5 },
  { d: scribble(186, 524, 560, 44, 3), w: 5 },
  { d: scribble(186, 553, 140, 45, 3), w: 5 },
  ...rect(184, 601, 330, 56, 50).map((d) => ({ d, w: 3.5 })),
  ...rect(184, 673, 346, 56, 54).map((d) => ({ d, w: 3 })),
  ...rect(184, 761, 286, 42, 58).map((d) => ({ d, w: 2.5 })),
  ...rect(494, 761, 220, 42, 62).map((d) => ({ d, w: 2.5 })),
  ...rect(885, 298, 530, 400, 70).map((d) => ({ d, w: 3.5 })),
  { d: rough(885, 298, 1415, 698, 80, 8), w: 2 },
  { d: rough(1415, 298, 885, 698, 81, 8), w: 2 },
];

export function SketchToSite({
  src,
  alt,
  className,
  frameClassName,
  penClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  frameClassName?: string;
  penClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.45"] });
  const p = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${p}% 0 0)`;
  const pen = useMotionTemplate`${useTransform(p, (v) => 100 - v)}%`;
  const sketchOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.18]);

  return (
    <div ref={ref} className={className}>
      <div className={frameClassName}>
        <motion.div style={{ clipPath: reduce ? undefined : clip, position: "absolute", inset: 0 }}>
          <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 1300px" style={{ objectFit: "cover", objectPosition: "top left" }} />
        </motion.div>
        <motion.svg
          viewBox="0 0 1600 920"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: reduce ? 0.18 : sketchOpacity }}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {SKETCH.map((s, i) => (
            <motion.path
              key={i}
              d={s.d}
              strokeWidth={s.w}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.045, ease: "easeInOut" }}
            />
          ))}
        </motion.svg>
        {!reduce && <motion.span className={penClassName} style={{ left: pen }} aria-hidden="true" />}
      </div>
    </div>
  );
}

// Soulignement tracé au feutre.
export function Underline({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {children}
      <svg viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M4 16 C 50 6, 120 22, 216 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}

// Le poinçon : la marque que l'artisan frappe sur son ouvrage.
export function Poincon({
  size = 64,
  className,
  spin = false,
}: {
  size?: number;
  className?: string;
  spin?: boolean;
}) {
  const reduce = useReducedMotion();
  const ringId = `ring-${useId().replace(/:/g, "")}`;
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      animate={spin && !reduce ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 40, repeat: Infinity, ease: "linear" } : undefined}
    >
      <defs>
        <path id={ringId} d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="27" fill="currentColor" />
      <text
        fontSize="9.5"
        fill="currentColor"
        style={{ fontFamily: "var(--a-text), sans-serif", fontWeight: 600 }}
      >
        <textPath href={`#${ringId}`} textLength="222" lengthAdjust="spacing">ATLAS · ATELIER WEB · FAIT MAIN ·</textPath>
      </text>
      <text
        x="50"
        y="61"
        textAnchor="middle"
        fontSize="32"
        className="poincon-a"
        style={{ fontFamily: "var(--a-display), serif", fill: "var(--poincon-a, #fff)" }}
      >
        A
      </text>
    </motion.svg>
  );
}
