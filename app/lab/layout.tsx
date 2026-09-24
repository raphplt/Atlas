import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab — pistes d'identité",
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
