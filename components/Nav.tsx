import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Nav() {
	return (
		<header className="sticky top-0 z-50 backdrop-blur bg-[var(--color-bg)]/70 border-b border-[var(--color-border)]">
			<div className="container flex items-center gap-4 h-16">
				<a href="#hero" className="font-bold text-lg tracking-tight gradient-text">
					Atlas
				</a>
				<nav className="hidden md:flex gap-8 text-sm font-medium text-[var(--color-muted)]">
					<a href="#offres" className="hover:text-[var(--color-fg)] transition">
						Offres
					</a>
					<a
						href="#realisations"
						className="hover:text-[var(--color-fg)] transition"
					>
						Réalisations
					</a>
					<a href="#process" className="hover:text-[var(--color-fg)] transition">
						Process
					</a>
					<a href="#contact" className="hover:text-[var(--color-fg)] transition">
						Contact
					</a>
				</nav>
				<div className="ml-auto flex items-center gap-2">
					<ThemeToggle />
					<a
						href="#contact"
						className={buttonVariants({
							className: "hidden md:inline-flex font-semibold",
						})}
					>
						Appel gratuit
					</a>
				</div>
			</div>
		</header>
	);
}
