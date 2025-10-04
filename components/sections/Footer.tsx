import Logo from "@/components/Logo";

// Icônes SVG pour les réseaux sociaux
const GitHubIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
	</svg>
);

const LinkedInIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
		<rect x="2" y="9" width="4" height="12" />
		<circle cx="4" cy="4" r="2" />
	</svg>
);

const MailIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
		<polyline points="22,6 12,13 2,6" />
	</svg>
);

const CoffeeIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M18 8h1a4 4 0 0 1 0 8h-1" />
		<path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
		<line x1="6" y1="1" x2="6" y2="4" />
		<line x1="10" y1="1" x2="10" y2="4" />
		<line x1="14" y1="1" x2="14" y2="4" />
	</svg>
);

export function Footer() {
	return (
		<footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 backdrop-blur-sm">
			<div className="container py-16 footer-grid text-sm">
				<div className="space-y-4 max-w-sm">
					<Logo size={8} />
					<h3 className="font-semibold text-base">Atlas</h3>
					<p className="text-[var(--color-muted)] leading-relaxed">
						Sites vitrines modernes et performants pour artisans & services locaux.
						Design premium, optimisation locale, conversion.
					</p>

					{/* Liens sociaux */}
					<div className="flex items-center gap-4 pt-2">
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="GitHub"
						>
							<GitHubIcon />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="LinkedIn"
						>
							<LinkedInIcon />
						</a>
						<a
							href="mailto:contact@atlas.com"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="Email"
						>
							<MailIcon />
						</a>
						<a
							href="https://buymeacoffee.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="Buy me a coffee"
						>
							<CoffeeIcon />
						</a>
					</div>

					<p className="text-xs text-[var(--color-muted)]">
						© {new Date().getFullYear()} Atlas — Tous droits réservés.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-8">
					<div className="space-y-4">
						<h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--color-muted)]">
							Navigation
						</h4>
						<ul className="space-y-2">
							{[
								["Offres", "#offres"],
								["Réalisations", "#realisations"],
								["Avant / Après", "#avant-apres"],
								["Process", "#process"],
								["Contact", "#contact"],
							].map(([label, href]) => (
								<li key={label}>
									<a href={href} className="hover:text-[var(--color-fg)] transition">
										{label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className="space-y-4">
						<h4 className="font-semibold text-xs uppercase tracking-wider text-[var(--color-muted)]">
							Légal
						</h4>
						<ul className="space-y-2">
							<li>
								<a href="/about" className="hover:text-[var(--color-fg)] transition">
									À propos
								</a>
							</li>
							<li>
								<a
									href="/legal/mentions-legales"
									className="hover:text-[var(--color-fg)] transition"
								>
									Mentions légales
								</a>
							</li>
							<li>
								<a
									href="/legal/cgv"
									className="hover:text-[var(--color-fg)] transition"
								>
									CGV
								</a>
							</li>
							<li>
								<a
									href="/legal/politique-confidentialite"
									className="hover:text-[var(--color-fg)] transition"
								>
									Confidentialité
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
