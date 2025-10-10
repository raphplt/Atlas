"use client";

import { ArrowUpRight } from "lucide-react";
import { trackSecondaryCta } from "@/lib/analytics";

interface SecondaryCtaProps {
	href: string;
	children: React.ReactNode;
	location?: string;
	className?: string;
}

/**
 * Secondary CTA button with consistent styling and tracking
 */
export function SecondaryCta({
	href,
	children,
	location = "unknown",
	className = "",
}: SecondaryCtaProps) {
	const handleClick = () => {
		trackSecondaryCta(location);
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={className || "w-full sm:w-auto"}
		>
			<button className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-sm hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-card)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]">
				<div className="flex items-center justify-center gap-2">
					<ArrowUpRight className="size-4 text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors" />
					<span className="text-sm sm:text-base font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
						{children}
					</span>
				</div>
			</button>
		</a>
	);
}
