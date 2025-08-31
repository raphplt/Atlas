export interface Project {
	id: string;
	title: string;
	subtitle: string;
	beforeSrc: string;
	afterSrc: string;
	alt: string;
	improvements: string[];
	category: string;
}

export const projects: Project[] = [
	{
		id: "coiffeur",
		title: "Site Coiffeur",
		subtitle: "Refonte moderne et responsive",
		beforeSrc: "/images/screenshots/before/coiffeur.png",
		afterSrc: "/images/screenshots/after/coiffeur.png",
		alt: "Refonte site coiffeur",
		improvements: [
			"Design moderne avec navigation intuitive et mise en page épurée",
			"Optimisation mobile-first pour une expérience parfaite sur tous les écrans",
			"Intégration de la prise de rendez-vous en ligne et des réseaux sociaux",
		],
		category: "beauty",
	},
	{
		id: "plombier",
		title: "Site Plombier",
		subtitle: "Interface professionnelle et efficace",
		beforeSrc: "/images/screenshots/before/plombier.png",
		afterSrc: "/images/screenshots/after/plombier.png",
		alt: "Refonte site plombier",
		improvements: [
			"Structure claire des services avec devis en ligne intégré",
			"Optimisation SEO locale pour améliorer la visibilité sur Google",
			"Section témoignages clients et galerie de réalisations",
		],
		category: "services",
	},
	{
		id: "paysagiste",
		title: "Site Paysagiste",
		subtitle: "Présentation élégante des créations",
		beforeSrc: "/images/screenshots/before/paysagiste.png",
		afterSrc: "/images/screenshots/after/paysagiste.png",
		alt: "Refonte site paysagiste",
		improvements: [
			"Galerie photos haute qualité pour mettre en valeur les réalisations",
			"Formulaire de contact optimisé avec géolocalisation",
			"Design nature et professionnel adapté au secteur du paysage",
		],
		category: "landscape",
	},
	{
		id: "photographe",
		title: "Site Photographe",
		subtitle: "Portfolio artistique et moderne",
		beforeSrc: "/images/screenshots/before/photographe.png",
		afterSrc: "/images/screenshots/after/photographe.png",
		alt: "Refonte site photographe",
		improvements: [
			"Portfolio visuel avec navigation fluide et présentation optimisée",
			"Système de réservation intégré pour les séances photo",
			"Blog intégré pour partager conseils et actualités du studio",
		],
		category: "creative",
	},
];

export const getProjectById = (id: string): Project | undefined => {
	return projects.find((project) => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
	return projects.filter((project) => project.category === category);
};
