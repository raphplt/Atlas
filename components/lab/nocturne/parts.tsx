"use client";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { formatSeconds, usePageSpeed } from "@/components/lab/PageSpeed";

// Atlas porte le monde : un disque posé sur une ligne.
export function NocturneMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="15" r="12" fill="currentColor" />
      <rect x="2" y="32" width="36" height="5" fill="currentColor" />
    </svg>
  );
}

// Titre qui « s'étire » à l'arrivée : l'axe de chasse passe de condensé à étendu.
export function StretchTitle({ lines, className }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={line}
          style={{ display: "block" }}
          initial={reduce ? false : { fontVariationSettings: '"wdth" 75' }}
          animate={{ fontVariationSettings: '"wdth" 125' }}
          transition={{ duration: 1.4, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );
}

// Titre dont la chasse suit le défilement.
export function ScrollStretch({
  children,
  className,
  as = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const w = useTransform(scrollYProgress, [0, 1], [75, 125]);
  const fvs = useMotionTemplate`"wdth" ${w}`;
  const Tag = motion[as];
  return (
    <Tag ref={ref} className={className} style={{ fontVariationSettings: fvs }}>
      {children}
    </Tag>
  );
}

// Carte projet collante qui recule quand la suivante la recouvre.
export function StackCard({
  children,
  className,
  wrapClassName,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  wrapClassName?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const filter = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.45)"]);
  return (
    <div ref={ref} className={wrapClassName}>
      <motion.div className={className} style={{ scale, filter, top: `${96 + index * 24}px` }}>
        {children}
      </motion.div>
    </div>
  );
}

export function BigSpeed({ className }: { className?: string }) {
  const ms = usePageSpeed();
  return (
    <div className={className} aria-live="polite">
      <span>{ms == null ? "…" : `${formatSeconds(ms)} s`}</span>
      <p>
        C’est le temps qu’a mis cette page à s’afficher chez vous, mesuré à
        l’instant sur votre appareil. Un site lent perd ses visiteurs avant
        même d’avoir parlé.
      </p>
    </div>
  );
}
