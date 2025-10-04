/**
 * Hook React pour la gestion du consentement RGPD
 */

import { useState, useEffect, useCallback } from "react";
import {
	getConsentPreferences,
	saveConsentPreferences,
	preferencesToConsentData,
	applyConsentToGA,
	initializeDefaultConsent,
	clearConsentData,
	type ConsentPreferences,
} from "@/lib/consent";

export interface UseConsentReturn {
	// État du consentement
	hasConsent: boolean;
	isVisible: boolean;
	preferences: ConsentPreferences | null;

	// Actions
	acceptAll: () => void;
	rejectAll: () => void;
	acceptAnalytics: () => void;
	rejectAnalytics: () => void;
	acceptMarketing: () => void;
	rejectMarketing: () => void;
	showBanner: () => void;
	hideBanner: () => void;
	clearConsent: () => void;

	// États de chargement
	isLoading: boolean;
}

export function useConsent(): UseConsentReturn {
	const [hasConsent, setHasConsent] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [preferences, setPreferences] = useState<ConsentPreferences | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	// Initialisation au montage du composant
	useEffect(() => {
		const initConsent = () => {
			try {
				// Initialiser le consentement par défaut (refusé)
				initializeDefaultConsent();

				// Récupérer les préférences existantes
				const existingConsent = getConsentPreferences();

				if (existingConsent) {
					setPreferences(existingConsent);
					setHasConsent(true);
					setIsVisible(false);

					// Appliquer le consentement à GA
					const consentData = preferencesToConsentData(existingConsent);
					applyConsentToGA(consentData);
				} else {
					// Pas de consentement existant, afficher la bannière
					setIsVisible(true);
				}
			} catch (error) {
				console.error("Erreur lors de l'initialisation du consentement:", error);
				setIsVisible(true); // Afficher la bannière en cas d'erreur
			} finally {
				setIsLoading(false);
			}
		};

		initConsent();
	}, []);

	// Accepter tous les cookies
	const acceptAll = useCallback(() => {
		const newPreferences: Omit<ConsentPreferences, "timestamp" | "version"> = {
			analytics: true,
			marketing: true,
		};

		saveConsentPreferences(newPreferences);
		const consentData = preferencesToConsentData({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});

		applyConsentToGA(consentData);
		setPreferences({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});
		setHasConsent(true);
		setIsVisible(false);
	}, []);

	// Refuser tous les cookies
	const rejectAll = useCallback(() => {
		const newPreferences: Omit<ConsentPreferences, "timestamp" | "version"> = {
			analytics: false,
			marketing: false,
		};

		saveConsentPreferences(newPreferences);
		const consentData = preferencesToConsentData({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});

		applyConsentToGA(consentData);
		setPreferences({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});
		setHasConsent(true);
		setIsVisible(false);
	}, []);

	// Accepter uniquement les cookies analytiques
	const acceptAnalytics = useCallback(() => {
		const newPreferences: Omit<ConsentPreferences, "timestamp" | "version"> = {
			analytics: true,
			marketing: false,
		};

		saveConsentPreferences(newPreferences);
		const consentData = preferencesToConsentData({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});

		applyConsentToGA(consentData);
		setPreferences({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});
		setHasConsent(true);
		setIsVisible(false);
	}, []);

	// Refuser les cookies analytiques
	const rejectAnalytics = useCallback(() => {
		const newPreferences: Omit<ConsentPreferences, "timestamp" | "version"> = {
			analytics: false,
			marketing: preferences?.marketing || false,
		};

		saveConsentPreferences(newPreferences);
		const consentData = preferencesToConsentData({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});

		applyConsentToGA(consentData);
		setPreferences({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});
	}, [preferences?.marketing]);

	// Accepter les cookies marketing
	const acceptMarketing = useCallback(() => {
		const newPreferences: Omit<ConsentPreferences, "timestamp" | "version"> = {
			analytics: preferences?.analytics || false,
			marketing: true,
		};

		saveConsentPreferences(newPreferences);
		const consentData = preferencesToConsentData({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});

		applyConsentToGA(consentData);
		setPreferences({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});
	}, [preferences?.analytics]);

	// Refuser les cookies marketing
	const rejectMarketing = useCallback(() => {
		const newPreferences: Omit<ConsentPreferences, "timestamp" | "version"> = {
			analytics: preferences?.analytics || false,
			marketing: false,
		};

		saveConsentPreferences(newPreferences);
		const consentData = preferencesToConsentData({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});

		applyConsentToGA(consentData);
		setPreferences({
			...newPreferences,
			timestamp: Date.now(),
			version: "1.0.0",
		});
	}, [preferences?.analytics]);

	// Afficher la bannière
	const showBanner = useCallback(() => {
		setIsVisible(true);
	}, []);

	// Masquer la bannière
	const hideBanner = useCallback(() => {
		setIsVisible(false);
	}, []);

	// Supprimer toutes les données de consentement
	const clearConsent = useCallback(() => {
		clearConsentData();
		setPreferences(null);
		setHasConsent(false);
		setIsVisible(true);
		initializeDefaultConsent();
	}, []);

	return {
		hasConsent,
		isVisible,
		preferences,
		acceptAll,
		rejectAll,
		acceptAnalytics,
		rejectAnalytics,
		acceptMarketing,
		rejectMarketing,
		showBanner,
		hideBanner,
		clearConsent,
		isLoading,
	};
}
