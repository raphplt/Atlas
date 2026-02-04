"use client";

import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { trackSecondaryCta } from "@/lib/analytics";

export interface SecondaryCtaProps {
	href: string;
	children: React.ReactNode;
	location?: string;
	className?: string;
}

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
			className={cn(
				buttonVariants({ variant: "secondary", size: "lg" }),
				className
			)}
		>
			<span className="flex items-center gap-2">
				{children}
				<ArrowUpRight className="size-4" />
			</span>
		</a>
	);
}
