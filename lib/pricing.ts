// ──────────────────────────────────────────────
// Atlas Simulator — Pricing engine
// ──────────────────────────────────────────────

/* ── Types ── */

export type ProjectType = "creation" | "refonte";

export type PageTier = "onePage" | "threePages" | "fivePages";

export type FeatureId =
	| "contactForm"
	| "booking"
	| "blog"
	| "seo"
	| "maps"
	| "gallery";

export type OptionId = "maintenance" | "cmsTraining" | "contentWriting";

export interface PriceRange {
	min: number;
	max: number;
}

/** Visual block descriptor for the blueprint SVG */
export interface BlueprintBlock {
	id: string;
	label: string;
	/** Position hint for layout in the SVG (row, col in a rough grid) */
	row: number;
	col: number;
	/** Width in grid units (1 or 2) */
	span: number;
}

export interface Feature {
	id: FeatureId;
	price: PriceRange;
	/** Which blueprint block appears when this feature is selected */
	blueprint: BlueprintBlock;
}

export interface Option {
	id: OptionId;
	price: PriceRange;
	/** Whether this is a recurring monthly cost (displayed differently) */
	monthly: boolean;
}

/* ── Data ── */

export const BASE_PRICES: Record<ProjectType, PriceRange> = {
	creation: { min: 490, max: 690 },
	refonte: { min: 590, max: 790 },
};

export const PAGE_TIER_PRICES: Record<PageTier, PriceRange> = {
	onePage: { min: 0, max: 0 },
	threePages: { min: 200, max: 300 },
	fivePages: { min: 400, max: 600 },
};

export const PAGE_TIER_BLUEPRINTS: Record<PageTier, BlueprintBlock[]> = {
	onePage: [
		{ id: "page-home", label: "Accueil", row: 0, col: 0, span: 2 },
	],
	threePages: [
		{ id: "page-home", label: "Accueil", row: 0, col: 0, span: 2 },
		{ id: "page-about", label: "À propos", row: 1, col: 0, span: 1 },
		{ id: "page-contact", label: "Contact", row: 1, col: 1, span: 1 },
	],
	fivePages: [
		{ id: "page-home", label: "Accueil", row: 0, col: 0, span: 2 },
		{ id: "page-about", label: "À propos", row: 1, col: 0, span: 1 },
		{ id: "page-services", label: "Services", row: 1, col: 1, span: 1 },
		{ id: "page-gallery", label: "Galerie", row: 2, col: 0, span: 1 },
		{ id: "page-contact", label: "Contact", row: 2, col: 1, span: 1 },
	],
};

export const FEATURES: Feature[] = [
	{
		id: "contactForm",
		price: { min: 50, max: 100 },
		blueprint: { id: "bp-contact", label: "Formulaire", row: 3, col: 0, span: 1 },
	},
	{
		id: "booking",
		price: { min: 150, max: 250 },
		blueprint: { id: "bp-booking", label: "Réservation", row: 3, col: 1, span: 1 },
	},
	{
		id: "blog",
		price: { min: 200, max: 350 },
		blueprint: { id: "bp-blog", label: "Blog", row: 4, col: 0, span: 2 },
	},
	{
		id: "seo",
		price: { min: 100, max: 200 },
		blueprint: { id: "bp-seo", label: "SEO", row: 5, col: 0, span: 1 },
	},
	{
		id: "maps",
		price: { min: 30, max: 60 },
		blueprint: { id: "bp-maps", label: "Maps", row: 5, col: 1, span: 1 },
	},
	{
		id: "gallery",
		price: { min: 80, max: 150 },
		blueprint: { id: "bp-gallery", label: "Galerie", row: 4, col: 0, span: 2 },
	},
];

export const OPTIONS: Option[] = [
	{
		id: "maintenance",
		price: { min: 30, max: 30 },
		monthly: true,
	},
	{
		id: "cmsTraining",
		price: { min: 80, max: 150 },
		monthly: false,
	},
	{
		id: "contentWriting",
		price: { min: 150, max: 300 },
		monthly: false,
	},
];

/* ── State type for the simulator ── */

export interface SimulatorState {
	projectType: ProjectType | null;
	pageTier: PageTier;
	features: FeatureId[];
	options: OptionId[];
	step: number;
}

export const INITIAL_STATE: SimulatorState = {
	projectType: null,
	pageTier: "onePage",
	features: [],
	options: [],
	step: 0,
};

export const TOTAL_STEPS = 5;

/* ── Calculator ── */

export function calculatePriceRange(state: SimulatorState): PriceRange {
	if (!state.projectType) return { min: 0, max: 0 };

	const base = BASE_PRICES[state.projectType];
	const pages = PAGE_TIER_PRICES[state.pageTier];

	let min = base.min + pages.min;
	let max = base.max + pages.max;

	for (const fid of state.features) {
		const feature = FEATURES.find((f) => f.id === fid);
		if (feature) {
			min += feature.price.min;
			max += feature.price.max;
		}
	}

	for (const oid of state.options) {
		const option = OPTIONS.find((o) => o.id === oid);
		if (option && !option.monthly) {
			min += option.price.min;
			max += option.price.max;
		}
	}

	// Round to nearest 10
	min = Math.round(min / 10) * 10;
	max = Math.round(max / 10) * 10;

	return { min, max };
}

/** Monthly recurring costs (displayed separately) */
export function calculateMonthly(state: SimulatorState): number {
	let total = 0;
	for (const oid of state.options) {
		const option = OPTIONS.find((o) => o.id === oid);
		if (option?.monthly) {
			total += option.price.min;
		}
	}
	return total;
}

/** Get all active blueprint blocks based on current state */
export function getActiveBlueprints(state: SimulatorState): BlueprintBlock[] {
	const blocks: BlueprintBlock[] = [];

	// Page tier blocks
	blocks.push(...PAGE_TIER_BLUEPRINTS[state.pageTier]);

	// Feature blocks
	for (const fid of state.features) {
		const feature = FEATURES.find((f) => f.id === fid);
		if (feature) {
			blocks.push(feature.blueprint);
		}
	}

	return blocks;
}
