import { buttonVariants } from "@/components/ui/button";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur border-b border-white/5">
      <div className="container flex items-center justify-between h-14">
        <a href="#hero" className="font-bold">Freelance</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#offres" className="hover:underline">Offres</a>
          <a href="#realisations" className="hover:underline">Réalisations</a>
          <a href="#process" className="hover:underline">Process</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <a href="#contact" className={buttonVariants({ className: "hidden md:inline-flex" })}>
          Appel gratuit
        </a>
      </div>
    </header>
  );
}
