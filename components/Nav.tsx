"use client";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Image from "next/image";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

type NavLink = { href: string; label: string; section?: string };

const LINKS: NavLink[] = [
	{ href: "#offres", label: "Offres", section: "offres" },
	{ href: "#realisations", label: "Réalisations", section: "realisations" },
	{ href: "#process", label: "Process", section: "process" },
	{ href: "#contact", label: "Contact", section: "contact" },
];

export function Nav() {
	// UI state
	const [scrolled, setScrolled] = useState(false);
	const [compact, setCompact] = useState(false);
	const [active, setActive] = useState<string>(LINKS[0].href);
	const [menuOpen, setMenuOpen] = useState(false);

	// Refs
	const barRef = useRef<HTMLDivElement | null>(null);
	const indicatorRef = useRef<HTMLDivElement | null>(null);
	const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

	// Scroll listener for compact header
	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			setScrolled(y > 8);
			setCompact(y > 40);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Scroll-spy using IntersectionObserver
	useEffect(() => {
		const sections = LINKS.map((l) => l.section).filter(Boolean) as string[];
		const observer = new IntersectionObserver(
			(entries) => {
				// Pick entry most in view (highest intersection ratio & isIntersecting)
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible.length) {
					const id = visible[0].target.id;
					const found = LINKS.find((l) => l.section === id);
					if (found) setActive(found.href);
				}
			},
			{
				rootMargin: "-40% 0px -55% 0px", // favor center viewport
				threshold: [0.1, 0.25, 0.5, 0.75],
			}
		);
		sections.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, []);

	// Indicator motion
	const updateIndicator = useCallback(() => {
		const indicator = indicatorRef.current;
		const bar = barRef.current;
		if (!indicator || !bar) return;
		const target = linkRefs.current[active];
		if (!target) return;
		const barRect = bar.getBoundingClientRect();
		const rect = target.getBoundingClientRect();
		const x = rect.left - barRect.left;
		indicator.style.transform = `translateX(${x}px)`;
		indicator.style.width = `${rect.width}px`;
	}, [active]);

	useEffect(() => {
		updateIndicator();
	}, [active, updateIndicator]);

	useEffect(() => {
		const onResize = () => updateIndicator();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [updateIndicator]);

	// Close menu on navigation
	const handleNavigate = (href: string) => {
		setActive(href);
		setMenuOpen(false);
	};

	return (
		<header
			className={clsx(
				"fixed inset-x-0 top-0 z-50 flex justify-center px-4 md:px-6 transition-[height,background,backdrop-filter] duration-300",
				"backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--color-bg)]/60 bg-[var(--color-bg)]/85",
				scrolled && "border-b border-[var(--color-border)]/60 shadow-sm",
				compact ? "h-14" : "h-20"
			)}
			role="navigation"
			aria-label="Navigation principale"
		>
			<div className="w-full max-w-7xl flex items-center gap-3">
				{/* Logo */}
				<a
					href="#hero"
					className={clsx(
						"flex items-center font-semibold tracking-tight shrink-0 transition-transform",
						compact ? "scale-[0.9]" : "scale-100"
					)}
					aria-label="Accueil Atlas"
				>
					<Image
						src="/images/Logo.png"
						alt="Atlas"
						width={140}
						height={48}
						className="object-contain w-auto h-10"
						priority
					/>
				</a>

				{/* Pill Nav (desktop) */}
				<div
					className={clsx(
						"relative hidden md:flex items-center rounded-full border border-[var(--color-border)]/70",
						"bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]",
						"px-2 py-1.5 text-sm font-medium text-[var(--color-muted)] backdrop-blur-sm shadow-sm",
						compact ? "ml-4" : "ml-6"
					)}
					ref={barRef}
					role="menubar"
					aria-label="Sections du site"
				>
					{/* Sliding indicator */}
					<div
						ref={indicatorRef}
						aria-hidden="true"
						className="absolute inset-y-1 rounded-full bg-[var(--color-accent)]/15 ring-1 ring-inset ring-[var(--color-accent)]/30 transition-all duration-300 ease-out will-change-transform"
						style={{ width: 0, transform: "translateX(0)" }}
					/>
					{LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							ref={(el) => {
								linkRefs.current[link.href] = el;
							}}
							onClick={() => handleNavigate(link.href)}
							className={clsx(
								"relative z-10 rounded-full px-3 py-1.5 transition-colors",
								active === link.href
									? "text-[var(--color-fg)]"
									: "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
							)}
							role="menuitemradio"
							aria-checked={active === link.href}
						>
							{link.label}
						</a>
					))}
					{/* Subtle separator gradient edges */}
					<span className="pointer-events-none absolute -inset-px rounded-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)] mix-blend-overlay" />
				</div>

				<div className="ml-auto flex items-center gap-2 md:gap-4">
					<ThemeToggle />
					<a
						href="#contact"
						onClick={() => handleNavigate("#contact")}
						className={buttonVariants({
							className: "hidden md:inline-flex font-semibold shadow-sm",
						})}
					>
						Appel gratuit
					</a>
					{/* Mobile menu button */}
					<button
						className="md:hidden inline-flex items-center justify-center rounded-full border border-[var(--color-border)]/70 bg-[var(--color-bg)]/70 backdrop-blur px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60"
						aria-label="Ouvrir le menu"
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((o) => !o)}
					>
						<span className="sr-only">Menu</span>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="transition-transform"
						>
							{menuOpen ? (
								<path d="M18 6L6 18M6 6l12 12" />
							) : (
								<path d="M3 6h18M3 12h18M3 18h18" />
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile panel */}
			<div
				className={clsx(
					"md:hidden fixed left-0 right-0 top-[--nav-bottom] origin-top overflow-hidden px-4 pt-2 transition-[max-height,opacity] duration-300",
					menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				)}
				style={{
					// custom property drives top offset (safe area for dynamic height header)
					["--nav-bottom" as any]: compact ? "3.5rem" : "5rem",
				}}
				aria-hidden={!menuOpen}
			>
				<div className="rounded-2xl border border-[var(--color-border)]/70 bg-[var(--color-bg)]/90 backdrop-blur-md p-4 shadow-xl">
					<nav className="grid gap-1" aria-label="Menu mobile">
						{LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => handleNavigate(link.href)}
								className={clsx(
									"rounded-lg px-3 py-2 text-sm font-medium transition-colors",
									active === link.href
										? "bg-[var(--color-accent)]/15 text-[var(--color-fg)]"
										: "text-[var(--color-muted)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-fg)]"
								)}
							>
								{link.label}
							</a>
						))}
						<a
							href="#contact"
							onClick={() => handleNavigate("#contact")}
							className={clsx(
								buttonVariants({
									className: "w-full justify-center font-semibold mt-2",
								})
							)}
						>
							Appel gratuit
						</a>
					</nav>
				</div>
			</div>
		</header>
	);
}
