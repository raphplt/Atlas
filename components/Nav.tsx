"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import clsx from "clsx";
import { LanguageToggle } from "@/components/LanguageToggle";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ArrowRight } from "lucide-react";

export function Navbar() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const t = useTranslations("navigation");
	const activeSection = useActiveSection();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const LINKS = [
		{ href: "/#hero", label: t("home"), type: "anchor" },
		{ href: "/#portfolio", label: t("portfolio"), type: "anchor" },
		{ href: "/#process", label: t("process"), type: "anchor" },
		{ href: "/#simulateur", label: t("simulator"), type: "anchor" },
		{ href: "/#about", label: t("about"), type: "anchor" },
	];

	return (
		<>
			<div
				className={clsx(
					"fixed inset-x-0 top-0 z-50 transition-all duration-500",
					scrolled
						? "bg-[var(--color-background)]/85 backdrop-blur-xl border-b border-[var(--color-accent)]/20 shadow-sm"
						: "bg-transparent border-b border-transparent"
				)}
			>
				<div className="container-width flex items-center justify-between h-16 md:h-20">
					<Link
						className="flex gap-3 items-center justify-center group"
						href="/"
					>
						<Logo />
						<span className="font-heading text-xl font-bold tracking-tight text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
							Atlas
						</span>
					</Link>

					<nav className="hidden items-center gap-8 lg:flex">
						{LINKS.map((l) => {
							const sectionId = l.href.replace("/#", "").replace("#", "");
							const isActive =
								l.type === "anchor" ? activeSection === sectionId : false;

							return (
								<Link
									key={l.href}
									href={l.href}
									className={clsx(
										"relative text-sm font-medium transition-all duration-300 hover:text-[var(--color-primary)]",
										isActive
											? "text-[var(--color-primary)] font-semibold"
											: "text-[var(--color-muted)]"
									)}
								>
									{l.label}
									{isActive && (
										<span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
									)}
								</Link>
							);
						})}
					</nav>

					<div className="hidden lg:flex items-center gap-3">
						<ThemeToggle />
						<LanguageToggle />
						<a
							href="#simulateur"
							className="nav-cta group"
						>
							<span className="relative z-10 flex items-center gap-2">
								{t("startProject")}
								<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
							</span>
						</a>
					</div>

					<div className="flex items-center gap-3 lg:hidden">
						<ThemeToggle />
						<LanguageToggle />
						<button
							onClick={() => setOpen((v) => !v)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-[var(--color-border)]/60 text-[var(--color-foreground)] transition-all hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/30"
							aria-label="Menu"
						>
							<svg
								viewBox="0 0 24 24"
								className="size-5"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							>
								{open ? (
									<path d="M18 6L6 18M6 6l12 12" />
								) : (
									<path d="M3 12h18M3 6h18M3 18h18" />
								)}
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu overlay */}
			{open && (
				<div className="fixed inset-0 z-40 bg-[var(--color-background)]/98 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col gap-6">
					<nav className="flex flex-col gap-2 text-lg font-medium">
						{LINKS.map((l) => {
							const sectionId = l.href.replace("/#", "").replace("#", "");
							const isActive =
								l.type === "anchor" ? activeSection === sectionId : false;
							return (
								<Link
									key={l.href}
									href={l.href}
									onClick={() => setOpen(false)}
									className={clsx(
										"block py-3 px-4 rounded-[var(--radius)] transition-all",
										isActive
											? "text-[var(--color-primary)] bg-[var(--color-accent)]/5 border-l-2 border-[var(--color-accent)]"
											: "text-[var(--color-foreground)] hover:bg-[var(--color-background-alt)]"
									)}
								>
									{l.label}
								</Link>
							);
						})}
					</nav>
					<a
						href="#simulateur"
						onClick={() => setOpen(false)}
						className="nav-cta text-center mt-4"
					>
						<span className="relative z-10 flex items-center justify-center gap-2">
							{t("startProject")}
							<ArrowRight className="size-4" />
						</span>
					</a>
				</div>
			)}
		</>
	);
}
