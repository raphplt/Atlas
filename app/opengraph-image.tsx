import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Atlas — Mettez votre activité sur la carte.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OUTER: [number, number][] = [
  [50, 6],
  [94, 90],
  [6, 90],
];
const ring = (k: number) =>
  `M${OUTER.map(([x, y]) => `${52 + (x - 52) * k} ${30 + (y - 30) * k}`).join(" L")} Z`;

export default async function Image() {
  const asset = (file: string) => readFile(join(process.cwd(), "assets", file));
  const [bold, medium, contours] = await Promise.all([
    asset("fonts/FunnelDisplay-Bold.ttf"),
    asset("fonts/FunnelDisplay-Medium.ttf"),
    asset("contours.svg"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#1f3bd9",
          color: "#fff",
          fontFamily: "Funnel Display",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;base64,${contours.toString("base64")}`}
          width={1200}
          height={630}
          alt=""
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg
            viewBox="0 0 100 96"
            width={64}
            height={61}
            fill="none"
            stroke="#fff"
            strokeWidth={8}
            strokeLinejoin="round"
          >
            {[1, 0.62, 0.26].map((k) => (
              <path key={k} d={ring(k)} />
            ))}
          </svg>
          <span style={{ fontSize: 60, fontWeight: 700, letterSpacing: -2.7 }}>atlas</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: -4,
          }}
        >
          <span>Mettez votre activité</span>
          <span>sur la carte.</span>
        </div>
        <span style={{ fontSize: 28, fontWeight: 500 }}>
          Raphaël Plassart · Design et développement web
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Funnel Display", data: bold, weight: 700, style: "normal" },
        { name: "Funnel Display", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
