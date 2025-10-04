"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useConsent } from "@/hooks/useConsent";
import { Settings, Cookie, Shield, BarChart3, Target } from "lucide-react";

/**
 * Bannière de consentement RGPD conforme CNIL
 * Affiche une bannière discrète en bas de page avec options claires
 */
export function ConsentBanner() {
	const {
		isVisible,
		acceptAll,
		rejectAll,
		acceptAnalytics,
		rejectAnalytics,
		acceptMarketing,
		rejectMarketing,
		preferences,
		isLoading,
	} = useConsent();

	const [showDetails, setShowDetails] = useState(false);

	// Ne pas afficher pendant le chargement
	if (isLoading || !isVisible) {
		return null;
	}

	return (
		<>
			{/* Bannière principale */}
			<div
				className="consent-banner"
				role="dialog"
				aria-labelledby="consent-title"
				aria-describedby="consent-description"
				aria-live="polite"
			>
				<div className="consent-banner-content">
					<div className="consent-banner-text">
						<div className="consent-banner-header">
							<Cookie className="consent-icon" aria-hidden="true" />
							<h3 id="consent-title" className="consent-title">
								Gestion des cookies
							</h3>
						</div>
						<p id="consent-description" className="consent-description">
							Nous utilisons des cookies pour améliorer votre expérience et analyser
							notre trafic. Vous pouvez accepter tous les cookies ou personnaliser vos
							préférences.
						</p>
					</div>

					<div className="consent-banner-actions">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowDetails(true)}
							className="consent-details-btn"
							aria-label="Gérer mes préférences de cookies"
						>
							<Settings className="w-4 h-4 mr-2" aria-hidden="true" />
							Gérer
						</Button>

						<Button
							variant="ghost"
							size="sm"
							onClick={rejectAll}
							className="consent-reject-btn"
							aria-label="Refuser tous les cookies"
						>
							Refuser
						</Button>

						<Button
							variant="default"
							size="sm"
							onClick={acceptAll}
							className="consent-accept-btn"
							aria-label="Accepter tous les cookies"
						>
							Accepter
						</Button>
					</div>
				</div>
			</div>

			{/* Modal de détails */}
			<Dialog open={showDetails} onOpenChange={setShowDetails}>
				<DialogContent
					className="consent-modal"
					aria-labelledby="consent-modal-title"
				>
					<DialogHeader>
						<DialogTitle id="consent-modal-title" className="consent-modal-title">
							<Shield className="w-5 h-5 mr-2 inline" aria-hidden="true" />
							Gestion de vos préférences de cookies
						</DialogTitle>
						<DialogDescription className="consent-modal-description">
							Nous respectons votre vie privée. Choisissez les types de cookies que
							vous acceptez. Vos préférences seront sauvegardées pendant 13 mois
							maximum.
						</DialogDescription>
					</DialogHeader>

					<div className="consent-categories">
						{/* Cookies essentiels */}
						<div className="consent-category">
							<div className="consent-category-header">
								<Shield className="consent-category-icon" aria-hidden="true" />
								<div>
									<h4 className="consent-category-title">Cookies essentiels</h4>
									<p className="consent-category-description">
										Nécessaires au fonctionnement du site. Ils ne peuvent pas être
										désactivés.
									</p>
								</div>
								<div className="consent-category-status">
									<span className="consent-status-badge consent-status-required">
										Toujours actifs
									</span>
								</div>
							</div>
						</div>

						{/* Cookies analytiques */}
						<div className="consent-category">
							<div className="consent-category-header">
								<BarChart3 className="consent-category-icon" aria-hidden="true" />
								<div>
									<h4 className="consent-category-title">Cookies analytiques</h4>
									<p className="consent-category-description">
										Nous aident à comprendre comment vous utilisez notre site via Google
										Analytics.
									</p>
								</div>
								<div className="consent-category-status">
									<span
										className={`consent-status-badge ${preferences?.analytics ? "consent-status-granted" : "consent-status-denied"}`}
									>
										{preferences?.analytics ? "Activés" : "Désactivés"}
									</span>
								</div>
							</div>
							<div className="consent-category-actions">
								<Button
									variant={preferences?.analytics ? "default" : "ghost"}
									size="sm"
									onClick={acceptAnalytics}
									className="consent-category-btn"
								>
									Activer
								</Button>
								<Button
									variant={!preferences?.analytics ? "default" : "ghost"}
									size="sm"
									onClick={rejectAnalytics}
									className="consent-category-btn"
								>
									Désactiver
								</Button>
							</div>
						</div>

						{/* Cookies marketing */}
						<div className="consent-category">
							<div className="consent-category-header">
								<Target className="consent-category-icon" aria-hidden="true" />
								<div>
									<h4 className="consent-category-title">Cookies marketing</h4>
									<p className="consent-category-description">
										Utilisés pour personnaliser les publicités et mesurer leur efficacité.
									</p>
								</div>
								<div className="consent-category-status">
									<span
										className={`consent-status-badge ${preferences?.marketing ? "consent-status-granted" : "consent-status-denied"}`}
									>
										{preferences?.marketing ? "Activés" : "Désactivés"}
									</span>
								</div>
							</div>
							<div className="consent-category-actions">
								<Button
									variant={preferences?.marketing ? "default" : "ghost"}
									size="sm"
									onClick={acceptMarketing}
									className="consent-category-btn"
								>
									Activer
								</Button>
								<Button
									variant={!preferences?.marketing ? "default" : "ghost"}
									size="sm"
									onClick={rejectMarketing}
									className="consent-category-btn"
								>
									Désactiver
								</Button>
							</div>
						</div>
					</div>

					<DialogFooter className="consent-modal-footer">
						<Button
							variant="ghost"
							onClick={rejectAll}
							className="consent-modal-reject"
						>
							Refuser tout
						</Button>
						<Button
							variant="default"
							onClick={() => {
								acceptAll();
								setShowDetails(false);
							}}
							className="consent-modal-accept"
						>
							Accepter tout
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

/**
 * Composant pour afficher un lien "Gérer mes cookies" dans le footer
 */
export function ConsentManager() {
	const { showBanner, clearConsent, hasConsent } = useConsent();

	if (!hasConsent) {
		return null;
	}

	return (
		<button
			onClick={() => {
				clearConsent();
				showBanner();
			}}
			className="consent-manager-link"
			aria-label="Gérer mes préférences de cookies"
		>
			<Settings className="w-4 h-4 mr-1" aria-hidden="true" />
			Gérer mes cookies
		</button>
	);
}
