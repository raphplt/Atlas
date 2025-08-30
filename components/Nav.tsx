"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const LINKS = [
	{ href: "#hero", label: "Accueil" },
	{ href: "#offres", label: "Offres" },
	{ href: "#realisations", label: "Réalisations" },
	{ href: "#process", label: "Process" },
	{ href: "#contact", label: "Contact" },
];

export function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div className="mx-auto max-w-[1200px] px-4">
				{/* Bar */}
				<div
					className={clsx(
						"mt-4 flex h-14 items-center justify-between rounded-full",
						"border border-[var(--color-border)]/60",
						"bg-white/70 dark:bg-[var(--color-card)]/70 backdrop-blur-xl",
						"shadow-[0_6px_30px_-10px_rgba(0,0,0,0.35)]",
						"transition-colors"
					)}
				>
					{/* Brand */}
					<Link
						href="#hero"
						className="ml-2 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-wide text-[var(--color-fg)]"
					>
						<span className="inline-block h-6 w-6 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#5ba8ff,40%,#f7a8a1,80%,#ffd67b)] ring-1 ring-black/5 dark:ring-white/10" />
						Atlas
					</Link>

					{/* Desktop nav */}
					<nav className="hidden items-center gap-1 md:flex">
						{LINKS.map((l) => (
							<a
								key={l.href}
								href={l.href}
								className={clsx(
									"rounded-full px-4 py-2 text-sm text-[var(--color-muted)]",
									"hover:text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10",
									"transition-colors"
								)}
							>
								{l.label}
							</a>
						))}
					</nav>

					{/* Right actions */}
					<div className="mr-2 flex items-center gap-1">
						<ThemeToggle />
						<button
							onClick={() => setOpen((v) => !v)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]/60 bg-white/60 text-[var(--color-fg)] transition-colors hover:bg-[var(--color-accent)]/10 active:scale-95 md:hidden dark:bg-white/5"
							aria-label="Menu"
						>
							{/* hamburger / close */}
							<svg
								viewBox="0 0 24 24"
								className={clsx(
									"size-4 transition-all duration-300",
									open ? "rotate-90" : "rotate-0"
								)}
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							>
								{open ? (
									<path d="M18 6L6 18M6 6l12 12" />
								) : (
									<>
										<path d="M3 6h18" />
										<path d="M3 12h18" />
										<path d="M3 18h18" />
									</>
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile dropdown */}
				<div
					className={clsx(
						"md:hidden",
						"transition-[max-height,opacity] duration-300 ease-out",
						open ? "max-h-64 opacity-100" : "pointer-events-none max-h-0 opacity-0"
					)}
				>
					<div className="mx-2 mt-2 rounded-2xl border border-[var(--color-border)]/60 bg-white/80 p-2 backdrop-blur-xl dark:bg-[var(--color-card)]/80">
						<nav className="flex flex-col">
							{LINKS.map((l) => (
								<a
									key={l.href}
									href={l.href}
									onClick={() => setOpen(false)}
									className="rounded-lg px-4 py-2 text-sm text-[var(--color-muted)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-fg)] transition-colors"
								>
									{l.label}
								</a>
							))}
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}
