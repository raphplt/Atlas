"use client";

import { CircleChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
	getActiveVariant,
	getCtaCopy,
	type CtaVariant,
} from "@/lib/ab-testing";
import { trackCtaClick, type CtaLocation } from "@/lib/analytics";

interface PrimaryCtaProps {
	location: CtaLocation;
	className?: string;
	size?: "default" | "large";
	showIcon?: boolean;
	showSubtext?: boolean;
}

/**
 * Primary CTA component with A/B testing support
 * Automatically detects variant from cookie or environment
 */
export function PrimaryCta({
	location,
	className = "",
	size = "default",
	showIcon = true,
	showSubtext = false,
}: PrimaryCtaProps) {
	const [variant, setVariant] = useState<CtaVariant>("A");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Get variant from cookie
		const cookies = document.cookie.split(";");
		const ctaCookie = cookies.find((c) => c.trim().startsWith("cta_variant="));
		const cookieValue = ctaCookie?.split("=")[1];
		setVariant(getActiveVariant(cookieValue));
	}, []);

	const copy = getCtaCopy(variant);

	const handleClick = () => {
		trackCtaClick(location, variant);
	};

	if (!mounted) {
		// Return placeholder during SSR
		return (
			<div
				className={`inline-block animate-pulse bg-[var(--color-accent)]/20 rounded-xl ${
					size === "large" ? "h-14 w-64" : "h-12 w-48"
				}`}
			/>
		);
	}

	const baseClasses =
		"relative group inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 overflow-hidden";

	const sizeClasses =
		size === "large" ? "h-14 px-8 text-base" : "h-12 px-6 text-sm";

	const colorClasses =
		"btn-primary-sober bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white hover:from-[var(--color-accent)]/90 hover:to-[var(--color-accent-alt)]/90 shadow-[0_8px_24px_rgba(var(--color-accent-rgb),0.15)] hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

	return (
		<div className="flex flex-col gap-2">
			<a
				href="#contact"
				onClick={handleClick}
				className={`${baseClasses} ${sizeClasses} ${colorClasses} ${className}`}
				aria-label={copy.primary}
			>
				{/* Shimmer effect */}
				<span className="sober-shimmer" />

				{showIcon && (
					<CircleChevronDown className="size-5 relative z-10 group-hover:animate-bounce" />
				)}
				<span className="relative z-10">{copy.primary}</span>
			</a>

			{showSubtext && (
				<p className="text-xs sm:text-sm text-[var(--color-muted)] text-center max-w-md mx-auto px-2">
					{copy.subtitle}
				</p>
			)}
		</div>
	);
}
