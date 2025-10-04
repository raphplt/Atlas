import { cn } from "@/lib/utils";

export function H1({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h1
			className={cn(
				"text-5xl/tight md:text-7xl font-extrabold tracking-tight",
				className
			)}
		>
			{children}
		</h1>
	);
}

export function H2({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h2
			className={cn("text-3xl md:text-5xl font-bold tracking-tight", className)}
		>
			{children}
		</h2>
	);
}

export function H3({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h3
			className={cn("text-2xl md:text-3xl font-bold tracking-tight", className)}
		>
			{children}
		</h3>
	);
}

export function H4({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h4 className={cn("text-xl md:text-2xl font-bold tracking-tight", className)}>
			{children}
		</h4>
	);
}
