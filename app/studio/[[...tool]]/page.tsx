import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!isSanityConfigured)
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", padding: 40, maxWidth: 640 }}>
        <h1>Sanity n’est pas configuré</h1>
        <p>
          Renseignez <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> et{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> (voir <code>.env.example</code>),
          puis relancez le serveur.
        </p>
      </main>
    );
  return <Studio />;
}
