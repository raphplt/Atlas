import Logo from "@/components/Logo";
import {
	GitHubIcon,
	LinkedInIcon,
	MailIcon,
	CoffeeIcon,
} from "@/components/Icons";
import { ConsentManager } from "@/components/ConsentBanner";

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
							href="https://github.com/raphplt"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="GitHub"
						>
							<GitHubIcon />
						</a>
						<a
							href="https://linkedin.com/in/raphaël-plassart"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="LinkedIn"
						>
							<LinkedInIcon />
						</a>
						<a
							href="mailto:raphael.plassart@gmail.com"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="Email"
						>
							<MailIcon />
						</a>
						<a
							href="https://ko-fi.com/raphplt"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
							aria-label="Support me on Ko-fi"
						>
							<CoffeeIcon />
						</a>
					</div>

					<div className="space-y-2">
						<p className="text-xs text-[var(--color-muted)]">
							© {new Date().getFullYear()} Atlas — Tous droits réservés.
						</p>
						<ConsentManager />
					</div>
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
