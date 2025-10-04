"use client";
import { useEffect } from "react";

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
	function setTheme(t: "light" | "dark") {
		if (typeof document !== "undefined") {
			document.body.dataset.theme = t;
			document.documentElement.style.colorScheme = t;
			localStorage.setItem("theme", t);
		}
	}
	useEffect(() => {
		if (typeof document !== "undefined") {
			const stored = localStorage.getItem("theme") as "light" | "dark" | null;
			const currentTheme =
				(document.body.dataset.theme as "light" | "dark") || "light";
			const themeToSet = stored || currentTheme;
			document.documentElement.style.colorScheme = themeToSet;
		}
	}, []);
	return {
		theme:
			typeof document !== "undefined"
				? (document.body.dataset.theme as "light" | "dark")
				: "light",
		toggle: () =>
			setTheme(document.body.dataset.theme === "dark" ? "light" : "dark"),
		set: setTheme,
	};
}
