"use client";
import { useEffect, useState } from "react";

// Mesure réelle, sur l'appareil du visiteur : LCP si disponible, sinon fin du chargement.
export function usePageSpeed() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    let lcp = 0;
    let po: PerformanceObserver | undefined;
    try {
      po = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        lcp = entries[entries.length - 1].startTime;
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {}
    const settle = () => {
      const nav = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      setMs(lcp || nav?.domContentLoadedEventEnd || performance.now());
    };
    const t = window.setTimeout(settle, 1200);
    return () => {
      window.clearTimeout(t);
      po?.disconnect();
    };
  }, []);
  return ms;
}

export function formatSeconds(ms: number, locale = "fr-FR") {
  return (ms / 1000).toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: ms < 1000 ? 2 : 1,
  });
}

export function PageSpeed({
  before = "Cette page s’est affichée en",
  after = "Les vôtres le peuvent aussi.",
  className,
}: {
  before?: string;
  after?: string;
  className?: string;
}) {
  const ms = usePageSpeed();
  return (
    <p className={className} aria-live="polite">
      {before} <strong>{ms == null ? "…" : `${formatSeconds(ms)} s`}</strong>.{" "}
      {after}
    </p>
  );
}
