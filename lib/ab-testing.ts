/**
 * A/B Testing utilities for CTA copy variants
 * Supports environment variable and cookie-based variant selection
 */

export const CTA_VARIANTS = {
	A: {
		primary: "Obtenez votre diagnostic gratuit — réponse sous 24h",
		subtitle:
			"Découvrez comment transformer votre site en machine à générer des clients.",
	},
	B: {
		primary: "Analyse gratuite en 24h → + de demandes de devis",
		subtitle: "Rejoignez 20+ artisans qui génèrent plus de clients chaque mois.",
	},
	C: {
		primary: "Votre diagnostic offert aujourd'hui (sans engagement)",
		subtitle:
			"Audit personnalisé de votre présence en ligne + plan d'action concret.",
	},
} as const;

export type CtaVariant = keyof typeof CTA_VARIANTS;

/**
 * Get the active CTA variant from environment or cookie
 * Priority: cookie > env > default (A)
 */
export function getActiveVariant(cookieValue?: string): CtaVariant {
	// Check cookie first
	if (cookieValue && isValidVariant(cookieValue)) {
		return cookieValue as CtaVariant;
	}

	// Check environment variable
	const envVariant =
		process.env.CTA_COPY_DEFAULT || process.env.NEXT_PUBLIC_CTA_COPY_DEFAULT;
	if (envVariant && isValidVariant(envVariant)) {
		return envVariant as CtaVariant;
	}

	// Default to A
	return "A";
}

export function isValidVariant(value: string): value is CtaVariant {
	return value === "A" || value === "B" || value === "C";
}

/**
 * Get CTA copy for a specific variant
 */
export function getCtaCopy(variant: CtaVariant) {
	return CTA_VARIANTS[variant];
}
