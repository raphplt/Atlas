"use client";
import { useTheme } from "./ThemeScript";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggle } = useTheme();
	const isDark = theme === "dark";
	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
			className={cn(
				"relative cursor-pointer w-10 h-10 rounded-full soft-border flex items-center justify-center group overflow-hidden transition bg-[var(--color-bg-alt)]/70 hover:bg-[var(--color-bg-alt)] accent-ring",
				className
			)}
		>
			<Sun
				className={cn(
					"absolute size-5 text-[var(--color-accent)] transition",
					isDark && "translate-y-8 opacity-0"
				)}
			/>
			<Moon
				className={cn(
					"absolute size-5 text-[var(--color-accent)] transition",
					!isDark && "translate-y-8 opacity-0"
				)}
			/>
			<span className="sr-only">Changer de thème</span>
		</button>
	);
}
