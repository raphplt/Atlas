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
				"relative h-12 px-6 overflow-hidden",
				"bg-[var(--color-accent)]",
				"border-none shadow-[0_8px_24px_rgba(var(--color-accent-rgb),0.35)]",
				"transition-all duration-300",
				"hover:bg-[var(--color-accent)]/90 hover:shadow-[0_12px_32px_rgba(var(--color-accent-rgb),0.5)] hover:scale-[1.02]",
				"active:scale-[0.98]",
				"group",
				className
			)}
			{...props}
		>
			<div
				className={cn(
					"absolute inset-0",
					"bg-gradient-to-r from-white/20 via-white/10 to-transparent",
					"opacity-0 group-hover:opacity-100",
					"transition-opacity duration-500"
				)}
			/>

			<div className="relative z-10 flex items-center gap-2 font-semibold">
				{children}
			</div>
		</Button>
	);
}
