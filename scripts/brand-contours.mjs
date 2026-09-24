// Génère assets/contours.svg : les courbes de niveau de ContourField figées,
// pour les images de partage (app/opengraph-image.tsx). Usage : node scripts/brand-contours.mjs
import { writeFileSync } from "node:fs";

const W = 1200, H = 630, cell = 8, scale = 0.0022, levels = 16, t = 4;
const P = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i);
  let s = 7;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  return [...p, ...p];
})();
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const grad = (h, x, y) => ((h & 3) & 1 ? -x : x) + ((h & 3) & 2 ? -y : y);
function perlin(x, y) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x), v = fade(y), a = P[X] + Y, b = P[X + 1] + Y;
  const l1 = grad(P[a], x, y) + u * (grad(P[b], x - 1, y) - grad(P[a], x, y));
  const l2 = grad(P[a + 1], x, y - 1) + u * (grad(P[b + 1], x - 1, y - 1) - grad(P[a + 1], x, y - 1));
  return l1 + v * (l2 - l1);
}
const cols = Math.ceil(W / cell) + 1, rows = Math.ceil(H / cell) + 1;
const f = new Float32Array(cols * rows);
for (let j = 0; j < rows; j++)
  for (let i = 0; i < cols; i++) {
    const x = i * cell, y = j * cell;
    f[j * cols + i] =
      perlin(x * scale + t * 0.05, y * scale - t * 0.03) +
      0.45 * perlin(x * scale * 2.3 - t * 0.04, y * scale * 2.3 + 11.7);
  }
const r = (n) => Math.round(n * 10) / 10;
let out = "";
for (let l = 0; l < levels; l++) {
  const L = -0.75 + (1.7 * (l + 0.5)) / levels;
  const major = l % 5 === 2;
  let d = "";
  for (let j = 0; j < rows - 1; j++)
    for (let i = 0; i < cols - 1; i++) {
      const a = f[j * cols + i], b = f[j * cols + i + 1], c = f[(j + 1) * cols + i + 1], e = f[(j + 1) * cols + i];
      const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (e > L ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const x0 = i * cell, y0 = j * cell, x1 = x0 + cell, y1 = y0 + cell;
      const top = [x0 + ((L - a) / (b - a)) * cell, y0];
      const right = [x1, y0 + ((L - b) / (c - b)) * cell];
      const bottom = [x0 + ((L - e) / (c - e)) * cell, y1];
      const left = [x0, y0 + ((L - a) / (e - a)) * cell];
      const seg = (p, q) => (d += `M${r(p[0])} ${r(p[1])}L${r(q[0])} ${r(q[1])}`);
      switch (idx) {
        case 1: case 14: seg(left, bottom); break;
        case 2: case 13: seg(bottom, right); break;
        case 3: case 12: seg(left, right); break;
        case 4: case 11: seg(top, right); break;
        case 6: case 9: seg(top, bottom); break;
        case 7: case 8: seg(top, left); break;
        case 5: seg(top, right); seg(left, bottom); break;
        case 10: seg(top, left); seg(bottom, right); break;
      }
    }
  out += `<path d="${d}" stroke="rgba(255,255,255,${major ? 0.62 : 0.26})" stroke-width="${major ? 1.6 : 0.9}"/>`;
}
writeFileSync(
  "assets/contours.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" stroke-linecap="round">${out}</svg>\n`,
);
