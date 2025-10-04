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
		<>
			<div className="fixed inset-x-0 top-2 sm:top-4 z-50 flex justify-center px-4">
				<GlassEffect className="rounded-2xl px-3 sm:px-5 py-2 w-full sm:w-fit">
					<header className="flex items-center justify-between w-full">
						<Link
							href="/"
							className="inline-flex items-center gap-2 sm:gap-3 rounded-full px-2 sm:px-4 py-2 text-base sm:text-lg font-bold tracking-wide text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10 transition-all duration-300"
						>
							<Logo />
						</Link>

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
											className="rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 whitespace-nowrap text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10 hover:scale-105"
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
											"rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 whitespace-nowrap hover:scale-105",
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

						<div className="hidden lg:flex items-center gap-1 sm:gap-2 sm:ml-10">
							<LanguageToggle />
							<ThemeToggle />
						</div>

						<div className="flex itemsƒ-center gap-1 sm:gap-2 lg:hidden">
							<LanguageToggle />
							<ThemeToggle />
							<button
								onClick={() => setOpen((v) => !v)}
								className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]/60 bg-white/20 text-[var(--color-fg)] transition-all duration-300 hover:bg-[var(--color-accent)]/20 hover:scale-110 active:scale-95 backdrop-blur-sm"
								aria-label="Menu"
							>
								<svg
									viewBox="0 0 24 24"
									className={clsx(
										"size-4 sm:size-5 transition-all duration-300",
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
				</GlassEffect>
			</div>

			{/* Full Screen Mobile Menu */}
			<div
				className={clsx(
					"fixed inset-0 z-40 lg:hidden",
					"transition-all duration-300 ease-out",
					open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				)}
			>
				{/* Backdrop */}
				<div
					className="absolute inset-0 bg-[var(--color-bg)]/95 backdrop-blur-xl"
					onClick={() => setOpen(false)}
				/>

				{/* Menu Content */}
				<div className="relative h-full flex flex-col">
					{/* Header with close button */}
					<div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]/20">
						<Link
							href="/"
							onClick={() => setOpen(false)}
							className="inline-flex items-center gap-3"
						>
							<Logo />
						</Link>
						<button
							onClick={() => setOpen(false)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]/60 bg-white/20 text-[var(--color-fg)] transition-all duration-300 hover:bg-[var(--color-accent)]/20 hover:scale-110 active:scale-95 backdrop-blur-sm"
							aria-label="Fermer le menu"
						>
							<svg
								viewBox="0 0 24 24"
								className="size-5"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							>
								<path d="M18 6L6 18M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Navigation Links */}
					<nav className="flex-1 flex flex-col justify-center px-6 py-12">
						<div className="space-y-2">
							{LINKS.map((l, index) => {
								const sectionId = l.href.replace("/#", "").replace("#", "");
								const isActive =
									l.type === "anchor" ? activeSection === sectionId : false;

								if (l.type === "page") {
									return (
										<Link
											key={l.href}
											href={l.href}
											onClick={() => setOpen(false)}
											className={clsx(
												"block px-6 py-4 text-xl font-medium rounded-2xl transition-all duration-300 hover:scale-[1.02]",
												"text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10"
											)}
											style={{
												animationDelay: `${index * 100}ms`,
												animation: open ? "slideInUp 0.5s ease-out forwards" : "none",
											}}
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
											"block px-6 py-4 text-xl font-medium rounded-2xl transition-all duration-300 hover:scale-[1.02]",
											isActive
												? "text-[var(--color-accent)] bg-[var(--color-accent)]/20 shadow-lg"
												: "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-accent)]/10"
										)}
										style={{
											animationDelay: `${index * 100}ms`,
											animation: open ? "slideInUp 0.5s ease-out forwards" : "none",
										}}
									>
										{l.label}
									</a>
								);
							})}
						</div>
					</nav>

					{/* Footer with controls */}
					<div className="p-6 border-t border-[var(--color-border)]/20">
						<div className="flex items-center justify-center gap-4">
							<LanguageToggle />
							<ThemeToggle />
						</div>
					</div>
				</div>
			</div>

			{/* CSS Animations */}
			<style jsx>{`
				@keyframes slideInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</>
	);
}
