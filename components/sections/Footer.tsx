import Logo from "@/components/Logo";

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
