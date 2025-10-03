"use client";

import { useState, useEffect } from "react";

export function useActiveSection() {
	const [activeSection, setActiveSection] = useState("hero");

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "-20% 0px -70% 0px",
			threshold: 0,
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);

		// Observer toutes les sections avec un ID
		const sections = document.querySelectorAll("section[id]");
		sections.forEach((section) => {
			observer.observe(section);
		});

		return () => {
			sections.forEach((section) => {
				observer.unobserve(section);
			});
		};
	}, []);

	return activeSection;
}
