"use client";
import { useTheme } from "./ThemeScript";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggle } = useTheme();
	const [isDark, setIsDark] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setIsDark(theme === "dark");
	}, [theme]);

	const handleToggle = () => {
		setIsAnimating(true);
		toggle();
		setTimeout(() => setIsAnimating(false), 500);
	};

	return (
		<button
			type="button"
			onClick={handleToggle}
			aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
			className={cn(
				"relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]/60 bg-white/20 text-[var(--color-fg)] transition-all duration-300 hover:bg-[var(--color-accent)]/20 hover:scale-110 active:scale-95 backdrop-blur-sm overflow-hidden",
				isAnimating && "scale-95",
				className
			)}
		>
			<Sun
				className={cn(
					"absolute size-5 text-[var(--color-accent)] transform transition-all duration-500 ease-in-out",
					isDark
						? "translate-y-[-12px] opacity-0 rotate-90"
						: "translate-y-0 opacity-100 rotate-0"
				)}
			/>

			<Moon
				className={cn(
					"absolute size-5 text-[var(--color-accent)] transform transition-all duration-500 ease-in-out",
					isDark
						? "translate-y-0 opacity-100 rotate-0"
						: "translate-y-[12px] opacity-0 -rotate-90"
				)}
			/>

			<span className="sr-only">Changer de thème</span>
		</button>
	);
}
