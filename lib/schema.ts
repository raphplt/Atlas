export function businessSchema() {
  return {
			"@context": "https://schema.org",
			"@type": "ProfessionalService",
			name: "Atlas - Création de Sites Web pour Artisans",
			description:
				"Agence web spécialisée dans la création de sites vitrines optimisés pour artisans et services locaux. Livraison rapide en 5 jours.",
			areaServed: {
				"@type": "Country",
				name: "France",
			},
			url: "https://example.com",
			priceRange: "€490 - €1190",
			telephone: "+33-X-XX-XX-XX-XX",
			address: {
				"@type": "PostalAddress",
				addressCountry: "FR",
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.9",
				reviewCount: "87",
				bestRating: "5",
				worstRating: "1",
			},
			offers: {
				"@type": "AggregateOffer",
				priceCurrency: "EUR",
				lowPrice: "490",
				highPrice: "1190",
				offerCount: "3",
			},
			hasOfferCatalog: {
				"@type": "OfferCatalog",
				name: "Services de Création Web",
				itemListElement: [
					{
						"@type": "Offer",
						itemOffered: {
							"@type": "Service",
							name: "Pack Essentiel",
							description: "Site one-page responsive avec design moderne",
						},
					},
					{
						"@type": "Offer",
						itemOffered: {
							"@type": "Service",
							name: "Pack Performance",
							description: "Site multi-pages avec SEO local et analytics",
						},
					},
					{
						"@type": "Offer",
						itemOffered: {
							"@type": "Service",
							name: "Pack Excellence",
							description: "Solution complète avec blog et Google Business Profile",
						},
					},
				],
			},
			sameAs: [],
		};
}

export function faqSchema(
	questions: Array<{ question: string; answer: string }>
) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: questions.map((q) => ({
			"@type": "Question",
			name: q.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: q.answer,
			},
		})),
	};
}
