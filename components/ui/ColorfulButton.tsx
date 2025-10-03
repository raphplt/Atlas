import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	children: React.ReactNode;
}

export function ButtonColorful({
	className,
	label = "Explore Components",
	children,
	...props
}: ButtonColorfulProps) {
	return (
		<Button
			className={cn(
				"relative h-10 px-4 overflow-hidden",
				"bg-[var(--color-card)] border border-[var(--color-border)]",
				"transition-all duration-200",
				"group",
				className
			)}
			{...props}
		>
			<div
				className={cn(
					"absolute inset-0",
					"bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-alt)] to-[var(--color-accent)]",
					"opacity-40 group-hover:opacity-80",
					"blur transition-opacity duration-500"
				)}
			/>

			{children}
		</Button>
	);
}
