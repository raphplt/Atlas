"use client";
import { useEffect, useState } from "react";

export function ThemeScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `(()=>{try{const m=window.matchMedia('(prefers-color-scheme: dark)').matches;const s=localStorage.getItem('theme');const t=s|| (m?'dark':'light');document.body.dataset.theme=t;}catch(e){}})();`,
			}}
		/>
	);
}

export function useTheme() {
	const [theme, setThemeState] = useState<"light" | "dark">("light");

	function setTheme(t: "light" | "dark") {
		if (typeof document !== "undefined") {
			document.body.dataset.theme = t;
			document.documentElement.style.colorScheme = t;
			localStorage.setItem("theme", t);
			setThemeState(t);
		}
	}

	useEffect(() => {
		if (typeof document !== "undefined") {
			// Initialiser le thème
			const stored = localStorage.getItem("theme") as "light" | "dark" | null;
			const currentTheme =
				(document.body.dataset.theme as "light" | "dark") || "light";
			const themeToSet = stored || currentTheme;
			document.documentElement.style.colorScheme = themeToSet;
			setThemeState(themeToSet);

			// Écouter les changements de préférence système
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = (e: MediaQueryListEvent) => {
				if (!localStorage.getItem("theme")) {
					const newTheme = e.matches ? "dark" : "light";
					setTheme(newTheme);
				}
			};

			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, []);

	return {
		theme,
		toggle: () => setTheme(theme === "dark" ? "light" : "dark"),
		set: setTheme,
	};
}
