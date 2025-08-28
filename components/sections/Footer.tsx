export function Footer() {
  return (
    <footer className="container py-12 text-sm text-[var(--color-muted)] text-center">
      <nav className="mb-4 flex justify-center gap-4">
        <a href="#offres" className="hover:underline">Offres</a>
        <a href="#realisations" className="hover:underline">Réalisations</a>
        <a href="#process" className="hover:underline">Process</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </nav>
      <div className="mb-4 flex justify-center gap-4">
        <a href="/legal/mentions-legales" className="hover:underline">Mentions légales</a>
        <a href="/legal/cgv" className="hover:underline">CGV</a>
        <a href="/legal/politique-confidentialite" className="hover:underline">Confidentialité</a>
      </div>
      <p>© {new Date().getFullYear()} - Freelance Web</p>
    </footer>
  );
}
