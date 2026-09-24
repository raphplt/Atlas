import { ImageResponse } from "next/og";
export const alt = "Atlas — Votre savoir-faire. Un site à sa hauteur.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          width: "100%",
          height: "100%",
          background: "#f6f4ed",
          color: "#292923",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 70, fontWeight: 700, letterSpacing: -5 }}>
            atlas®
          </span>
          <span style={{ fontSize: 17 }}>DESIGN & DÉVELOPPEMENT WEB</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            letterSpacing: -3,
          }}
        >
          <span>Votre savoir-faire.</span>
          <span style={{ color: "#d64b2b" }}>Un site à sa hauteur.</span>
        </div>
        <span style={{ fontSize: 20 }}>
          Raphaël Plassart · Atelier indépendant
        </span>
      </div>
    ),
    size,
  );
}
