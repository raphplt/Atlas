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
import { useTranslations } from "next-intl";

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
	const t = useTranslations("consent");

	if (isLoading || !isVisible) {
		return null;
	}

	return (
		<>
			<div
				className="fixed bottom-0 left-0 right-0 z-[1000] bg-[var(--color-card)] border-t border-[var(--color-border)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-[10px] animate-[consent-slide-up_0.3s_ease-out]"
				role="dialog"
				aria-labelledby="consent-title"
				aria-describedby="consent-description"
				aria-live="polite"
			>
				<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 p-4 max-w-[var(--container)] mx-auto">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-2">
							<Cookie
								className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0"
								aria-hidden="true"
							/>
							<h3
								id="consent-title"
								className="text-base md:text-base font-semibold text-[var(--color-fg)] m-0"
							>
								{t("banner.title")}
							</h3>
						</div>
						<p
							id="consent-description"
							className="text-sm md:text-sm text-[var(--color-muted)] m-0 leading-relaxed"
						>
							{t("banner.description")}
						</p>
					</div>

					<div className="flex items-center gap-3 flex-shrink-0 md:flex-row">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowDetails(true)}
							className="flex-1 md:flex-none text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-bg-alt)] transition-all duration-200 justify-center md:justify-start"
							aria-label="Gérer mes préférences de cookies"
						>
							<Settings className="w-4 h-4 mr-2" aria-hidden="true" />
							{t("banner.manage")}
						</Button>

						<Button
							variant="ghost"
							size="sm"
							onClick={rejectAll}
							className="flex-1 md:flex-none text-sm font-medium text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-fg)] hover:bg-[var(--color-bg-alt)] hover:border-[var(--color-muted)] transition-all duration-200 justify-center md:justify-start"
							aria-label={t("banner.reject")}
						>
							{t("banner.reject")}
						</Button>

						<Button
							variant="default"
							size="sm"
							onClick={acceptAll}
							className="flex-1 md:flex-none text-sm font-medium bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white border-none hover:translate-y-[-1px] hover:shadow-[0_4px_12px_rgba(var(--color-accent-rgb),0.3)] transition-all duration-200 justify-center md:justify-start"
							aria-label={t("banner.accept")}
						>
							{t("banner.accept")}
						</Button>
					</div>
				</div>
			</div>

			<Dialog open={showDetails} onOpenChange={setShowDetails}>
				<DialogContent className="max-w-2xl" aria-labelledby="consent-modal-title">
					<DialogHeader>
						<DialogTitle id="consent-modal-title" className="consent-modal-title">
							<Shield className="w-5 h-5 mr-2 inline" aria-hidden="true" />
							{t("modal.title")}
						</DialogTitle>
						<DialogDescription className="consent-modal-description">
							{t("modal.description")}
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-6 my-6">
						<div className="border border-[var(--color-border)] rounded-xl p-4 bg-[var(--color-bg-alt)] transition-all duration-200 hover:border-[var(--color-accent)] hover:shadow-[0_2px_8px_rgba(var(--color-accent-rgb),0.1)]">
							<div className="flex items-start gap-4 mb-4">
								<Shield
									className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
									aria-hidden="true"
								/>
								<div className="flex-1">
									<h4 className="text-base font-semibold text-[var(--color-fg)] m-0 mb-1">
										{t("modal.categories.essential.title")}
									</h4>
									<p className="text-sm text-[var(--color-muted)] m-0 leading-relaxed">
										{t("modal.categories.essential.description")}
									</p>
								</div>
								<div className="flex-shrink-0">
									<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide bg-[var(--color-bg-alt)] text-[var(--color-muted)] border border-[var(--color-border)]">
										{t("modal.categories.essential.status")}
									</span>
								</div>
							</div>
						</div>

						<div className="border border-[var(--color-border)] rounded-xl p-4 bg-[var(--color-bg-alt)] transition-all duration-200 hover:border-[var(--color-accent)] hover:shadow-[0_2px_8px_rgba(var(--color-accent-rgb),0.1)]">
							<div className="flex items-start gap-4 mb-4">
								<BarChart3
									className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
									aria-hidden="true"
								/>
								<div className="flex-1">
									<h4 className="text-base font-semibold text-[var(--color-fg)] m-0 mb-1">
										{t("modal.categories.analytics.title")}
									</h4>
									<p className="text-sm text-[var(--color-muted)] m-0 leading-relaxed">
										{t("modal.categories.analytics.description")}
									</p>
								</div>
								<div className="flex-shrink-0">
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide border ${
											preferences?.analytics
												? "bg-[rgba(34,197,94,0.1)] text-[rgb(34,197,94)] border-[rgba(34,197,94,0.2)]"
												: "bg-[rgba(239,68,68,0.1)] text-[rgb(239,68,68)] border-[rgba(239,68,68,0.2)]"
										}`}
									>
										{preferences?.analytics
											? t("modal.categories.analytics.status.enabled")
											: t("modal.categories.analytics.status.disabled")}
									</span>
								</div>
							</div>
							<div className="flex gap-2">
								<Button
									variant={preferences?.analytics ? "default" : "ghost"}
									size="sm"
									onClick={acceptAnalytics}
									className="text-sm px-4 py-2"
								>
									{t("modal.categories.analytics.actions.enable")}
								</Button>
								<Button
									variant={!preferences?.analytics ? "default" : "ghost"}
									size="sm"
									onClick={rejectAnalytics}
									className="text-sm px-4 py-2"
								>
									{t("modal.categories.analytics.actions.disable")}
								</Button>
							</div>
						</div>

						{/* Cookies marketing */}
						<div className="border border-[var(--color-border)] rounded-xl p-4 bg-[var(--color-bg-alt)] transition-all duration-200 hover:border-[var(--color-accent)] hover:shadow-[0_2px_8px_rgba(var(--color-accent-rgb),0.1)]">
							<div className="flex items-start gap-4 mb-4">
								<Target
									className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0 mt-0.5"
									aria-hidden="true"
								/>
								<div className="flex-1">
									<h4 className="text-base font-semibold text-[var(--color-fg)] m-0 mb-1">
										{t("modal.categories.marketing.title")}
									</h4>
									<p className="text-sm text-[var(--color-muted)] m-0 leading-relaxed">
										{t("modal.categories.marketing.description")}
									</p>
								</div>
								<div className="flex-shrink-0">
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide border ${
											preferences?.marketing
												? "bg-[rgba(34,197,94,0.1)] text-[rgb(34,197,94)] border-[rgba(34,197,94,0.2)]"
												: "bg-[rgba(239,68,68,0.1)] text-[rgb(239,68,68)] border-[rgba(239,68,68,0.2)]"
										}`}
									>
										{preferences?.marketing
											? t("modal.categories.marketing.status.enabled")
											: t("modal.categories.marketing.status.disabled")}
									</span>
								</div>
							</div>
							<div className="flex gap-2">
								<Button
									variant={preferences?.marketing ? "default" : "ghost"}
									size="sm"
									onClick={acceptMarketing}
									className="text-sm px-4 py-2"
								>
									{t("modal.categories.marketing.actions.enable")}
								</Button>
								<Button
									variant={!preferences?.marketing ? "default" : "ghost"}
									size="sm"
									onClick={rejectMarketing}
									className="text-sm px-4 py-2"
								>
									{t("modal.categories.marketing.actions.disable")}
								</Button>
							</div>
						</div>
					</div>

					<DialogFooter className="flex justify-between gap-4 mt-6 pt-6 border-t border-[var(--color-border)]">
						<Button
							variant="ghost"
							onClick={rejectAll}
							className="text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-fg)] hover:bg-[var(--color-bg-alt)]"
						>
							{t("modal.footer.rejectAll")}
						</Button>
						<Button
							variant="default"
							onClick={() => {
								acceptAll();
								setShowDetails(false);
							}}
							className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-alt)] text-white border-none hover:translate-y-[-1px] hover:shadow-[0_4px_12px_rgba(var(--color-accent-rgb),0.3)]"
						>
							{t("modal.footer.acceptAll")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

export function ConsentManager() {
	const { showBanner, clearConsent, hasConsent } = useConsent();
	const t = useTranslations("consent");

	if (!hasConsent) {
		return null;
	}

	return (
		<button
			onClick={() => {
				clearConsent();
				showBanner();
			}}
			className="flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-xs"
			aria-label={t("manager.link")}
		>
			<Settings className="w-4 h-4 mr-1" aria-hidden="true" />
			{t("manager.link")}
		</button>
	);
}
