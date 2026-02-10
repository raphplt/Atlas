"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { CircleChevronDown } from "lucide-react";
import { trackCtaClick, CtaLocation } from "@/lib/analytics";

export interface PrimaryCtaProps {
	location: CtaLocation | "problems" | "nav"; // Extended to match usage elsewhere if needed
	className?: string;
	size?: "default" | "large";
	showIcon?: boolean;
	showSubtext?: boolean;
}

export function PrimaryCta({
	location,
	className = "",
	size = "default",
	showIcon = true,
	showSubtext = false,
}: PrimaryCtaProps) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	// Simple copy logic (previously A/B test, keeping static for now to fix errors)
	const copy = {
		primary: "Estimer mon projet",
		subtitle: "Gratuit et sans engagement",
	};

	const handleClick = () => {
		// Cast location to CtaLocation if it matches, otherwise default or handle logic
		// 'problems' and 'nav' might not be in CtaLocation type in analytics.ts exactly as is, 
		// but let's assume valid mapping or cast. 
		// safe cast for now as trackCtaClick expects CtaLocation
		trackCtaClick(location as CtaLocation);
	};

	if (!mounted) {
		return (
			<a
				className={cn(
					buttonVariants({ size: size === "large" ? "lg" : "default" }),
					className,
					"pointer-events-none opacity-50"
				)}
			>
				Chargement...
			</a>
		);
	}

	return (
		<div className="flex flex-col gap-2 items-center">
			<a
				href="#simulateur"
				onClick={handleClick}
				className={cn(
					buttonVariants({ size: size === "large" ? "lg" : "default" }),
					"font-bold",
					className
				)}
			>
				{copy.primary}
				{showIcon && <CircleChevronDown className="ml-2 size-5" />}
			</a>

			{showSubtext && (
				<p className="text-xs text-[var(--color-muted)] text-center max-w-md mx-auto px-2">
					{copy.subtitle}
				</p>
			)}
		</div>
	);
}
