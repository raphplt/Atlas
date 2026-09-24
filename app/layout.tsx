import type { Metadata } from "next";
import { siteMeta } from "@/lib/meta";

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
};

// Layout racine « transparent » : <html>/<body> sont rendus par
// app/[locale]/layout.tsx (site), et app/studio/layout.tsx (Sanity).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
