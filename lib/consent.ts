/**
 * Gestionnaire de consentement RGPD avec Google Consent Mode V2
 * Conforme aux directives CNIL et RGPD
 */

export interface ConsentData {
	analytics_storage: "granted" | "denied";
	ad_user_data: "granted" | "denied";
	ad_personalization: "granted" | "denied";
	timestamp: number;
	version: string;
}

export interface ConsentPreferences {
	analytics: boolean;
	marketing: boolean;
	timestamp: number;
	version: string;
}

// Durée de validité du consentement (13 mois maximum selon CNIL)
const CONSENT_DURATION = 13 * 30 * 24 * 60 * 60 * 1000;
const CONSENT_VERSION = "1.0.0";
const STORAGE_KEY = "atlas_consent_preferences";

/**
 * Vérifie si le consentement est valide (non expiré)
 */
export function isConsentValid(consent: ConsentPreferences): boolean {
	const now = Date.now();
	const consentAge = now - consent.timestamp;
	return consentAge < CONSENT_DURATION;
}

/**
 * Récupère les préférences de consentement depuis localStorage
 */
export function getConsentPreferences(): ConsentPreferences | null {
	if (typeof window === "undefined") return null;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return null;

		const consent: ConsentPreferences = JSON.parse(stored);

		// Vérifier la validité du consentement
		if (!isConsentValid(consent)) {
			localStorage.removeItem(STORAGE_KEY);
			return null;
		}

		return consent;
	} catch (error) {
		console.warn("Erreur lors de la lecture du consentement:", error);
		localStorage.removeItem(STORAGE_KEY);
		return null;
	}
}

/**
 * Sauvegarde les préférences de consentement
 */
export function saveConsentPreferences(
	preferences: Omit<ConsentPreferences, "timestamp" | "version">
): void {
	if (typeof window === "undefined") return;

	const consent: ConsentPreferences = {
		...preferences,
		timestamp: Date.now(),
		version: CONSENT_VERSION,
	};

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
	} catch (error) {
		console.error("Erreur lors de la sauvegarde du consentement:", error);
	}
}

/**
 * Convertit les préférences utilisateur en format Google Consent Mode V2
 */
export function preferencesToConsentData(
	preferences: ConsentPreferences
): ConsentData {
	return {
		analytics_storage: preferences.analytics ? "granted" : "denied",
		ad_user_data: preferences.marketing ? "granted" : "denied",
		ad_personalization: preferences.marketing ? "granted" : "denied",
		timestamp: preferences.timestamp,
		version: preferences.version,
	};
}

/**
 * Applique le consentement à Google Analytics via gtag
 */
export function applyConsentToGA(consentData: ConsentData): void {
	if (typeof window === "undefined" || !window.gtag) return;

	try {
		// Consent Mode V2 - Configuration par défaut
		window.gtag("consent", "default", {
			analytics_storage: consentData.analytics_storage,
			ad_user_data: consentData.ad_user_data,
			ad_personalization: consentData.ad_personalization,
		});

		// Consent Mode V2 - Mise à jour pour la session courante
		window.gtag("consent", "update", {
			analytics_storage: consentData.analytics_storage,
			ad_user_data: consentData.ad_user_data,
			ad_personalization: consentData.ad_personalization,
		});

		console.log("Consentement appliqué à Google Analytics:", consentData);
	} catch (error) {
		console.error("Erreur lors de l'application du consentement:", error);
	}
}

/**
 * Initialise le consentement par défaut (refusé) avant que l'utilisateur ne choisisse
 */
export function initializeDefaultConsent(): void {
	if (typeof window === "undefined" || !window.gtag) return;

	try {
		window.gtag("consent", "default", {
			analytics_storage: "denied",
			ad_user_data: "denied",
			ad_personalization: "denied",
		});

		console.log("Consentement par défaut initialisé (refusé)");
	} catch (error) {
		console.error(
			"Erreur lors de l'initialisation du consentement par défaut:",
			error
		);
	}
}

/**
 * Supprime toutes les données de consentement
 */
export function clearConsentData(): void {
	if (typeof window === "undefined") return;

	localStorage.removeItem(STORAGE_KEY);
	console.log("Données de consentement supprimées");
}

declare global {
	interface Window {
		gtag?: (...args: any[]) => void;
	}
}
