"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { LanguageToggle } from "@/components/LanguageToggle";
import Logo from "./Logo";
import { useTranslations } from "next-intl";
import { useActiveSection } from "@/hooks/useActiveSection";


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
			<div className="fixed inset-x-0 top-0 z-50 bg-[var(--color-background)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
				<div className="container-width flex items-center justify-between h-16 md:h-20">
						<Link
						className="flex gap-3 items-center justify-center"
							href="/">
							<Logo  />
							<p className="text-lg font-bold text-[var(--color-primary)]">Atlas</p>
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
											"text-sm font-medium transition-colors hover:text-[var(--color-primary)]",
											isActive
												? "text-[var(--color-primary)] font-semibold"
												: "text-[var(--color-muted)]"
										)}
									>
										{l.label}
									</Link>
								);
							})}
						</nav>

						<div className="hidden lg:flex items-center gap-4">
							<ThemeToggle />
							<LanguageToggle />
                            <a href="#contact" className={cn(buttonVariants({ size: "sm" }), "px-5 font-bold")}>
                                {t("startProject")}
                            </a>
						</div>

						<div className="flex items-center gap-4 lg:hidden">
							<ThemeToggle />
							<LanguageToggle />
							<button
								onClick={() => setOpen((v) => !v)}
								className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-foreground)]"
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

			{open && (
				<div className="fixed inset-0 z-40 bg-[var(--color-background)] lg:hidden pt-24 px-6 flex flex-col gap-6">
                    <nav className="flex flex-col gap-6 text-lg font-medium">
                        {LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="block py-2 text-[var(--color-foreground)] border-b border-[var(--color-border)]"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
				</div>
			)}
		</>
	);
}
