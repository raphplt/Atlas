export interface Project {
	id: string;
	title: string;
	subtitle: string;
	beforeSrc: string;
	afterSrc: string;
	alt: string;
	improvements: string[];
	improvementWords: string[];
	category: string;
}

export const projects: Project[] = [
	{
		id: "coiffeur",
		title: "Salon de Coiffure",
		subtitle: "Un design qui inspire confiance dès la première visite",
		beforeSrc: "/images/screenshots/before/coiffeur.png",
		afterSrc: "/images/screenshots/after/coiffeur.png",
		alt: "Démonstration de refonte — salon de coiffure",
		improvements: [
			"Design premium qui reflète l'image du salon",
			"Prise de rendez-vous en ligne, accessible 24h/24",
			"Site pensé mobile-first pour les clients en déplacement",
		],
		improvementWords: ["Design premium", "Rendez-vous en ligne", "Mobile-first"],
		category: "beauté",
	},
	{
		id: "plombier",
		title: "Plomberie Express",
		subtitle: "Visible sur Google, joignable en un clic",
		beforeSrc: "/images/screenshots/before/plombier.png",
		afterSrc: "/images/screenshots/after/plombier.png",
		alt: "Démonstration de refonte — plombier",
		improvements: [
			"Formulaire de devis rapide pour les urgences",
			"Optimisation pour apparaître dans les recherches locales",
			"Galerie de réalisations pour rassurer les prospects",
		],
		improvementWords: [
			"Devis rapide",
			"Visibilité locale",
			"Galerie de réalisations",
		],
		category: "services",
	},
	{
		id: "paysagiste",
		title: "Paysagiste Créatif",
		subtitle: "Un portfolio qui met en valeur votre savoir-faire",
		beforeSrc: "/images/screenshots/before/paysagiste.png",
		afterSrc: "/images/screenshots/after/paysagiste.png",
		alt: "Démonstration de refonte — paysagiste",
		improvements: [
			"Galerie immersive pour montrer vos projets sous leur meilleur jour",
			"Géolocalisation pour toucher les clients à proximité",
			"Design nature premium pour un positionnement haut de gamme",
		],
		improvementWords: [
			"Galerie immersive",
			"Clients de proximité",
			"Positionnement premium",
		],
		category: "paysage",
	},
	{
		id: "photographe",
		title: "Studio Photo Pro",
		subtitle: "Montrez votre talent, remplissez votre agenda",
		beforeSrc: "/images/screenshots/before/photographe.png",
		afterSrc: "/images/screenshots/after/photographe.png",
		alt: "Démonstration de refonte — photographe",
		improvements: [
			"Portfolio artistique qui reflète votre style unique",
			"Réservation en ligne pour un planning toujours rempli",
			"Blog pour attirer de nouveaux visiteurs via Google",
		],
		improvementWords: [
			"Portfolio artistique",
			"Réservation en ligne",
			"Blog & visibilité",
		],
		category: "créatif",
	},
];

export const getProjectById = (id: string): Project | undefined => {
	return projects.find((project) => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
	return projects.filter((project) => project.category === category);
};
