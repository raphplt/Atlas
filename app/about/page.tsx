import { About } from "@/components/sections/About";

export default function AboutPage() {
	return (
		<main className="pt-24 pb-16">
			<About />
		</main>
	);
}

export const metadata = {
	title: "À propos - Raphaël Plassart | Développeur Web Full Stack",
	description:
		"Découvrez mon parcours, mon expertise technique et mon approche développeur & entrepreneur. Co-fondateur de Melios et Quori, spécialisé React/Next.js, NestJS.",
	keywords:
		"Raphaël Plassart, développeur full stack, React Next.js, NestJS, PostgreSQL, entrepreneur, Melios, Quori, ETNA",
};
