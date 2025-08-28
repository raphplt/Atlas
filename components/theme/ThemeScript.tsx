"use client";
import { useEffect } from "react";

// Inline script to set initial theme before paint (avoids FOUC)
export function ThemeScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `(()=>{try{const m=window.matchMedia('(prefers-color-scheme: dark)').matches;const s=localStorage.getItem('theme');const t=s|| (m?'dark':'light');document.addEventListener('DOMContentLoaded',()=>{document.body.dataset.theme=t});document.documentElement.style.colorScheme=t==='dark'?'dark':'light';}catch(e){}})();`,
			}}
		/>
	);
}

export function useTheme() {
	function setTheme(t: "light" | "dark") {
		document.body.dataset.theme = t;
		document.documentElement.style.colorScheme = t;
		localStorage.setItem("theme", t);
	}
	useEffect(() => {
		const stored = localStorage.getItem("theme") as "light" | "dark" | null;
		if (stored) setTheme(stored);
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
