/**
 * Analytics tracking utilities for conversion optimization
 * Integrates with Vercel Analytics for event tracking
 */

import { track } from "@vercel/analytics";

export type CtaLocation =
	| "hero"
	| "sticky"
	| "problems"
	| "offers"
	| "footer"
	| "hero"
	| "sticky"
	| "problems"
	| "offers"
	| "footer"
	| "modal"
    | "wizard";

export interface CtaClickEvent {
	variant?: string;
	viewport: "mobile" | "tablet" | "desktop";
	page: string;
	location: CtaLocation;
}

export interface FormEvent {
	page: string;
	source: CtaLocation;
}

/**
 * Track CTA click event
 */
export function trackCtaClick(location: CtaLocation, variant?: string) {
	const viewport = getViewport();
	const page = window.location.pathname;

	track("cta_click", {
		location,
		variant: variant || "default",
		viewport,
		page,
	});

	// Also track specific location events
	track(`cta_${location}_click`, {
		variant: variant || "default",
		viewport,
		page,
	});
}

/**
 * Track form view (when form enters viewport)
 */
export function trackFormView(source: CtaLocation = "hero") {
	track("lead_form_view", {
		page: window.location.pathname,
		source,
	});
}

/**
 * Track form submission success
 */
export function trackFormSuccess(source: CtaLocation = "hero") {
	track("lead_form_submit_success", {
		page: window.location.pathname,
		source,
		timestamp: new Date().toISOString(),
	});
}

/**
 * Track form submission error
 */
export function trackFormError(error: string, source: CtaLocation = "hero") {
	track("lead_form_submit_error", {
		page: window.location.pathname,
		source,
		error,
		timestamp: new Date().toISOString(),
	});
}

/**
 * Track secondary CTA click
 */
export function trackSecondaryCta(location: string) {
	track("cta_secondary_click", {
		location,
		viewport: getViewport(),
		page: window.location.pathname,
	});
}

/**
 * Get current viewport size category
 */
function getViewport(): "mobile" | "tablet" | "desktop" {
	if (typeof window === "undefined") return "desktop";

	const width = window.innerWidth;
	if (width < 768) return "mobile";
	if (width < 1024) return "tablet";
	return "desktop";
}

/**
 * Track page view with UTM parameters
 */
export function trackPageView() {
	const params = new URLSearchParams(window.location.search);
	const utm_source = params.get("utm_source");
	const utm_variant = params.get("utm_variant");

	if (utm_source || utm_variant) {
		track("page_view_attributed", {
			utm_source: utm_source || "direct",
			utm_variant: utm_variant || "none",
			page: window.location.pathname,
		});
	}
}
