"use client";

import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import { useActiveSection } from "@/hooks/useActiveSection";
import { GlassEffect } from "@/components/ui/liquid-glass";

export function Navbar() {
	const [open, setOpen] = useState(false);
	const t = useTranslations("navigation");
	const activeSection = useActiveSection();

	const LINKS = [
		{ href: "/#hero", label: t("home"), type: "anchor" },
		{ href: "/#portfolio", label: t("portfolio"), type: "anchor" },
		{ href: "/#temoignages", label: t("testimonials"), type: "anchor" },
		{ href: "/#offres", label: t("offers"), type: "anchor" },
		{ href: "/#process", label: t("process"), type: "anchor" },
		{ href: "/#contact", label: t("contact"), type: "anchor" },
		{ href: "/about", label: t("about"), type: "page" },
	];

	return (
		<div className="fixed inset-x-0 top-4 z-50 flex justify-center">
			<GlassEffect className=" rounded-2xl px-5 py-2">
				<header className="flex items-center justify-between w-full">
					<Link
						href="/"
						className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-lg font-bold tracking-wide text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10 transition-all duration-300"
					>
						<Logo />
						{/* <span
							className="bg-gradient-to-r from-[#f7a8a1]  
						 to-[#5ba8ff] bg-clip-text text-transparent"
						>
							Atlas
						</span> */}
					</Link>

					{/* Navigation Desktop */}
					<nav className="hidden items-center gap-1 lg:flex">
						{LINKS.map((l) => {
							const sectionId = l.href.replace("/#", "").replace("#", "");
							const isActive =
								l.type === "anchor" ? activeSection === sectionId : false;

							if (l.type === "page") {
								return (
									<Link
										key={l.href}
										href={l.href}
										className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10 hover:scale-105"
									>
										{l.label}
									</Link>
								);
							}

							return (
								<a
									key={l.href}
									href={l.href}
									className={clsx(
										"rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap hover:scale-105",
										isActive
											? "text-[var(--color-accent)] bg-[var(--color-accent)]/20 shadow-lg"
											: "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10"
									)}
								>
									{l.label}
								</a>
							);
						})}
					</nav>

					{/* Controls */}
					<div className="flex items-center gap-2">
						<LanguageToggle />
						<ThemeToggle />

						{/* Mobile Menu Button */}
						<button
							onClick={() => setOpen((v) => !v)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]/60 bg-white/20 text-[var(--color-fg)] transition-all duration-300 hover:bg-[var(--color-accent)]/20 hover:scale-110 active:scale-95 lg:hidden backdrop-blur-sm"
							aria-label="Menu"
						>
							<svg
								viewBox="0 0 24 24"
								className={clsx(
									"size-5 transition-all duration-300",
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
				</header>

				{/* Mobile Menu */}
				<div
					className={clsx(
						"lg:hidden mt-4",
						"transition-[max-height,opacity] duration-300 ease-out",
						open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
					)}
				>
					<div className="rounded-xl border border-[var(--color-border)]/60 bg-white/20 p-3 backdrop-blur-sm">
						<nav className="flex flex-col gap-1">
							{LINKS.map((l) => {
								const sectionId = l.href.replace("/#", "").replace("#", "");
								const isActive =
									l.type === "anchor" ? activeSection === sectionId : false;

								if (l.type === "page") {
									return (
										<Link
											key={l.href}
											href={l.href}
											onClick={() => setOpen(false)}
											className="rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 text-[var(--color-muted)] hover:bg-[var(--color-accent)]/20 hover:text-[var(--color-fg)] hover:scale-[1.02]"
										>
											{l.label}
										</Link>
									);
								}

								return (
									<a
										key={l.href}
										href={l.href}
										onClick={() => setOpen(false)}
										className={clsx(
											"rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02]",
											isActive
												? "text-[var(--color-accent)] bg-[var(--color-accent)]/20 shadow-md"
												: "text-[var(--color-muted)] hover:bg-[var(--color-accent)]/20 hover:text-[var(--color-fg)]"
										)}
									>
										{l.label}
									</a>
								);
							})}
						</nav>
					</div>
				</div>
			</GlassEffect>
		</div>
	);
}
