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

	useEffect(() => {
		const initConsent = () => {
			try {
				initializeDefaultConsent();

				const existingConsent = getConsentPreferences();

				if (existingConsent) {
					setPreferences(existingConsent);
					setHasConsent(true);
					// setIsVisible(process.env.NODE_ENV === "development");

					const consentData = preferencesToConsentData(existingConsent);
					applyConsentToGA(consentData);
				} else {
					setIsVisible(true);
				}
			} catch (error) {
				console.error("Erreur lors de l'initialisation du consentement:", error);
				setIsVisible(true);
			} finally {
				setIsLoading(false);
			}
		};

		initConsent();
	}, []);

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

	const showBanner = useCallback(() => {
		setIsVisible(true);
	}, []);

	const hideBanner = useCallback(() => {
		setIsVisible(false);
	}, []);

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
