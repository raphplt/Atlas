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
		subtitle: "+150% de prises de RDV en ligne",
		beforeSrc: "/images/screenshots/before/coiffeur.png",
		afterSrc: "/images/screenshots/after/coiffeur.png",
		alt: "Refonte site coiffeur",
		improvements: [
			"Design premium qui inspire confiance et fidélise la clientèle",
			"Réservation en ligne 24h/24 : +80% de nouveaux clients",
			"Mobile-first : 70% des prises de RDV depuis smartphone",
		],
		improvementWords: ["Design premium", "Réservation en ligne", "Mobile-first"],
		category: "beauty",
	},
	{
		id: "plombier",
		title: "Plomberie Express",
		subtitle: "Premier sur Google local",
		beforeSrc: "/images/screenshots/before/plombier.png",
		afterSrc: "/images/screenshots/after/plombier.png",
		alt: "Refonte site plombier",
		improvements: [
			"Devis instantané en ligne : 3x plus de demandes",
			"SEO local optimisé : 1ère page Google en 2 mois",
			"Galerie de réalisations : +40% de conversion visiteurs → clients",
		],
		improvementWords: [
			"Devis instantané",
			"SEO local optimisé",
			"Galerie de réalisations",
		],
		category: "services",
	},
	{
		id: "paysagiste",
		title: "Paysagiste Créatif",
		subtitle: "Portfolio qui vend tout seul",
		beforeSrc: "/images/screenshots/before/paysagiste.png",
		afterSrc: "/images/screenshots/after/paysagiste.png",
		alt: "Refonte site paysagiste",
		improvements: [
			"Galerie immersive : +200% d'engagement sur les photos",
			"Géolocalisation intelligente : clients dans un rayon de 15km",
			"Design nature premium : positionnement haut de gamme",
		],
		improvementWords: [
			"Galerie immersive",
			"Géolocalisation intelligente",
			"Design nature premium",
		],
		category: "landscape",
	},
	{
		id: "photographe",
		title: "Studio Photo Pro",
		subtitle: "Portfolio qui convertit",
		beforeSrc: "/images/screenshots/before/photographe.png",
		afterSrc: "/images/screenshots/after/photographe.png",
		alt: "Refonte site photographe",
		improvements: [
			"Portfolio artistique : +120% de demandes de séances",
			"Réservation en ligne : planning optimisé, zéro oubli",
			"Blog SEO : +300% de trafic organique en 4 mois",
		],
		improvementWords: [
			"Portfolio artistique",
			"Réservation en ligne",
			"Blog SEO",
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
