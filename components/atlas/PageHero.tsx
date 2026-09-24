import { ContourField } from "./ContourField";

/** Bande bleue à courbes de niveau qui ouvre chaque page interne. */
export function PageHero({
  title,
  lead,
  back,
  children,
  ink = false,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  back?: React.ReactNode;
  children?: React.ReactNode;
  ink?: boolean;
}) {
  return (
    <section className={`band page-hero${ink ? " band-ink" : ""}`}>
      <ContourField className="band-field" levels={12} />
      <div className="wrap">
        {back}
        <h1 className="h1">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children && <div className="page-hero-extra">{children}</div>}
      </div>
    </section>
  );
}
