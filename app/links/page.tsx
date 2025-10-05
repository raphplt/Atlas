import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import Logo from "@/components/Logo";
import {
	GitHubIcon,
	LinkedInIcon,
	MailIcon,
	CoffeeIcon,
} from "@/components/Icons";
import Image from "next/image";

interface LinkItem {
	href: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	category: string;
	external?: boolean;
}

export default async function LinksPage() {
	const locale = await getLocale();
	const t = await getTranslations("links");

	const links: LinkItem[] = [
		{
			href: "https://github.com/raphplt",
			title: t("links.github.title"),
			description: t("links.github.description"),
			icon: <GitHubIcon />,
			category: "social",
			external: true,
		},
		{
			href: "https://linkedin.com/in/raphaël-plassart",
			title: t("links.linkedin.title"),
			description: t("links.linkedin.description"),
			icon: <LinkedInIcon />,
			category: "social",
			external: true,
		},
		{
			href: "mailto:raphael.plassart@gmail.com",
			title: t("links.email.title"),
			description: t("links.email.description"),
			icon: <MailIcon />,
			category: "contact",
		},
		{
			href: "https://ko-fi.com/raphplt",
			title: t("links.ko-fi.title"),
			description: t("links.ko-fi.description"),
			icon: <CoffeeIcon />,
			category: "support",
			external: true,
		},
		{
			href: "/",
			title: t("links.atlas.title"),
			description: t("links.atlas.description"),
			icon: <Logo size={6} />,
			category: "projects",
		},
		{
			href: "https://melios.me",
			title: t("links.melios.title"),
			description: t("links.melios.description"),
			icon: (
				<Image
					src="/images/projects/Melios.png"
					alt="Melios"
					width={28}
					height={28}
				/>
			),
			category: "projects",
			external: true,
		},
		{
			href: "https://www.quori.dev/",
			title: t("links.quori.title"),
			description: t("links.quori.description"),
			icon: (
				<Image
					src="/images/projects/Quori.png"
					alt="Quori"
					width={32}
					height={32}
				/>
			),
			category: "projects",
			external: true,
		},
	];

	const categories = [
		{ key: "social", title: t("categories.social") },
		{ key: "projects", title: t("categories.projects") },
		{ key: "contact", title: t("categories.contact") },
		{ key: "support", title: t("categories.support") },
	];

	const groupedLinks = categories.map((category) => ({
		...category,
		links: links.filter((link) => link.category === category.key),
	}));

	return (
		<div className="min-h-screen bg-[var(--color-bg)]">
			{/* Hero Background */}
			<div className="hero-bg" />
			<div className="noise" />

			{/* Main Content */}
			<main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
				<div className="w-full max-w-md space-y-8">
					{/* Profile Section */}
					<div className="text-center space-y-4">
						<div className="mx-auto mb-6">
							<Logo size={16} />
						</div>
						<h1 className="text-2xl font-bold text-[var(--color-fg)]">
							{t("profile.name")}
						</h1>
						<p className="text-lg text-[var(--color-fg-soft)]">
							{t("profile.title")}
						</p>
						<p className="text-sm text-[var(--color-muted)] max-w-xs mx-auto">
							{t("profile.description")}
						</p>
					</div>

					{/* Links Section */}
					<div className="space-y-6">
						{groupedLinks.map(
							(category) =>
								category.links.length > 0 && (
									<div key={category.key} className="space-y-3">
										<h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] px-1">
											{category.title}
										</h2>
										<div className="space-y-2">
											{category.links.map((link) => (
												<a
													key={link.href}
													href={link.href}
													target={link.external ? "_blank" : undefined}
													rel={link.external ? "noopener noreferrer" : undefined}
													className="group relative flex items-center gap-4 rounded-2xl bg-[var(--color-card)]/80 backdrop-blur-sm border border-[var(--color-border)] p-4 transition-all duration-300 hover:bg-[var(--color-card)]/90 hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:shadow-[var(--color-accent)]/10 hover:-translate-y-1"
												>
													{/* Icon */}
													<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent-alt)]/10 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300">
														{link.icon}
													</div>

													{/* Content */}
													<div className="flex-1 min-w-0">
														<h3 className="font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
															{link.title}
														</h3>
														<p className="text-sm text-[var(--color-muted)] line-clamp-1">
															{link.description}
														</p>
													</div>

													{/* External Link Indicator */}
													{link.external && (
														<div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
															<svg
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
																className="text-[var(--color-muted)]"
															>
																<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
																<polyline points="15,3 21,3 21,9" />
																<line x1="10" y1="14" x2="21" y2="3" />
															</svg>
														</div>
													)}

													{/* Hover Effect */}
													<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-accent)]/5 to-[var(--color-accent-alt)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
												</a>
											))}
										</div>
									</div>
								)
						)}
					</div>

					{/* Footer */}
					<div className="text-center pt-8">
						<p className="text-xs text-[var(--color-muted)]">
							© {new Date().getFullYear()} Atlas — Tous droits réservés.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
