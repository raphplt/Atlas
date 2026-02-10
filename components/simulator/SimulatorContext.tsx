"use client";

import { createContext, useContext, useReducer, type Dispatch } from "react";
import {
	type SimulatorState,
	type ProjectType,
	type PageTier,
	type FeatureId,
	type OptionId,
	INITIAL_STATE,
	TOTAL_STEPS,
} from "@/lib/pricing";

/* ── Actions ── */

type Action =
	| { type: "SET_PROJECT_TYPE"; payload: ProjectType }
	| { type: "SET_PAGE_TIER"; payload: PageTier }
	| { type: "TOGGLE_FEATURE"; payload: FeatureId }
	| { type: "TOGGLE_OPTION"; payload: OptionId }
	| { type: "NEXT_STEP" }
	| { type: "PREV_STEP" }
	| { type: "GO_TO_STEP"; payload: number }
	| { type: "RESET" };

function reducer(state: SimulatorState, action: Action): SimulatorState {
	switch (action.type) {
		case "SET_PROJECT_TYPE":
			return { ...state, projectType: action.payload };
		case "SET_PAGE_TIER":
			return { ...state, pageTier: action.payload };
		case "TOGGLE_FEATURE": {
			const has = state.features.includes(action.payload);
			return {
				...state,
				features: has
					? state.features.filter((f) => f !== action.payload)
					: [...state.features, action.payload],
			};
		}
		case "TOGGLE_OPTION": {
			const has = state.options.includes(action.payload);
			return {
				...state,
				options: has
					? state.options.filter((o) => o !== action.payload)
					: [...state.options, action.payload],
			};
		}
		case "NEXT_STEP":
			return { ...state, step: Math.min(state.step + 1, TOTAL_STEPS - 1) };
		case "PREV_STEP":
			return { ...state, step: Math.max(state.step - 1, 0) };
		case "GO_TO_STEP":
			return { ...state, step: Math.max(0, Math.min(action.payload, TOTAL_STEPS - 1)) };
		case "RESET":
			return INITIAL_STATE;
		default:
			return state;
	}
}

/* ── Context ── */

const SimulatorContext = createContext<{
	state: SimulatorState;
	dispatch: Dispatch<Action>;
} | null>(null);

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	return (
		<SimulatorContext.Provider value={{ state, dispatch }}>
			{children}
		</SimulatorContext.Provider>
	);
}

export function useSimulator() {
	const ctx = useContext(SimulatorContext);
	if (!ctx) throw new Error("useSimulator must be used within SimulatorProvider");
	return ctx;
}
