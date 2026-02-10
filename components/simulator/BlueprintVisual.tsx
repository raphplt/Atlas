"use client";

import { useSimulator } from "./SimulatorContext";
import { getActiveBlueprints, type BlueprintBlock } from "@/lib/pricing";
import { motion, AnimatePresence } from "framer-motion";

const GRID = {
	cols: 2,
	cellW: 150,
	cellH: 60,
	gap: 12,
	padX: 28,
	padY: 32,
};

function blockPosition(block: BlueprintBlock) {
	const x = GRID.padX + block.col * (GRID.cellW + GRID.gap);
	const y = GRID.padY + block.row * (GRID.cellH + GRID.gap);
	const w = block.span * GRID.cellW + (block.span - 1) * GRID.gap;
	return { x, y, w, h: GRID.cellH };
}

/** Connection lines between blocks */
function ConnectionLines({ blocks }: { blocks: BlueprintBlock[] }) {
	if (blocks.length < 2) return null;

	const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

	for (let i = 0; i < blocks.length - 1; i++) {
		const a = blockPosition(blocks[i]);
		const b = blockPosition(blocks[i + 1]);
		lines.push({
			x1: a.x + a.w / 2,
			y1: a.y + a.h,
			x2: b.x + b.w / 2,
			y2: b.y,
		});
	}

	return (
		<>
			{lines.map((line, i) => (
				<motion.line
					key={`conn-${i}`}
					x1={line.x1}
					y1={line.y1}
					x2={line.x2}
					y2={line.y2}
					stroke="var(--color-accent)"
					strokeOpacity={0.2}
					strokeWidth={1}
					strokeDasharray="3 3"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
				/>
			))}
		</>
	);
}

function BlueprintBlockEl({ block }: { block: BlueprintBlock }) {
	const { x, y, w, h } = blockPosition(block);

	return (
		<motion.g
			initial={{ opacity: 0, scale: 0.6 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.6 }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
				mass: 0.8,
			}}
		>
			{/* Shadow */}
			<rect
				x={x + 2}
				y={y + 2}
				width={w}
				height={h}
				rx={4}
				fill="var(--color-primary)"
				fillOpacity={0.04}
			/>
			{/* Block fill */}
			<rect
				x={x}
				y={y}
				width={w}
				height={h}
				rx={4}
				fill="var(--color-accent)"
				fillOpacity={0.08}
				stroke="var(--color-accent)"
				strokeOpacity={0.4}
				strokeWidth={1}
			/>
			{/* Top bar wireframe */}
			<rect
				x={x + 10}
				y={y + 10}
				width={w * 0.5}
				height={5}
				rx={2.5}
				fill="var(--color-accent)"
				fillOpacity={0.25}
			/>
			{/* Text lines mockup */}
			<rect
				x={x + 10}
				y={y + 22}
				width={w * 0.35}
				height={3}
				rx={1.5}
				fill="var(--color-primary)"
				fillOpacity={0.1}
			/>
			<rect
				x={x + 10}
				y={y + 30}
				width={w * 0.5}
				height={3}
				rx={1.5}
				fill="var(--color-primary)"
				fillOpacity={0.07}
			/>
			{/* Label — bigger and more readable */}
			<text
				x={x + w / 2}
				y={y + h - 8}
				textAnchor="middle"
				className="fill-[var(--color-accent)] font-mono"
				fontSize="11"
				fontWeight="600"
				fillOpacity={0.85}
			>
				{block.label}
			</text>
		</motion.g>
	);
}

export function BlueprintVisual() {
	const { state } = useSimulator();
	const blocks = getActiveBlueprints(state);

	// Calculate SVG dimensions
	const maxRow = blocks.reduce((m, b) => Math.max(m, b.row), 0);
	const svgH = GRID.padY * 2 + (maxRow + 1) * (GRID.cellH + GRID.gap) + 20;
	const svgW = GRID.padX * 2 + GRID.cols * GRID.cellW + (GRID.cols - 1) * GRID.gap;

	return (
		<div className="relative rounded-atlas border border-[var(--color-border)] bg-[var(--color-primary)]/[0.02] overflow-hidden">
			{/* Cartographic grid background */}
			<div className="absolute inset-0 bg-carto-grid-dense opacity-50" />

			{/* Header labels — readable */}
			<div className="absolute top-3 left-4 right-4 flex justify-between items-center">
				<span className="text-[11px] font-mono font-semibold text-[var(--color-primary)] tracking-wider opacity-50">
					ATLAS / BLUEPRINT
				</span>
				<span className="text-[11px] font-mono font-semibold text-[var(--color-primary)] tracking-wider opacity-50">
					v1.0
				</span>
			</div>

			<div className="relative z-10 flex items-center justify-center p-4 pt-8 min-h-[360px]">
				{blocks.length === 0 ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center space-y-3"
					>
						<div className="w-14 h-14 mx-auto rounded-full border-2 border-dashed border-[var(--color-border)] flex items-center justify-center">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--color-muted)]">
								<path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
							</svg>
						</div>
						<p className="text-sm text-[var(--color-muted)] font-mono">
							Sélectionnez vos options
						</p>
					</motion.div>
				) : (
					<svg
						viewBox={`0 0 ${svgW} ${svgH}`}
						width="100%"
						height="auto"
						className="max-w-[380px]"
					>
						{/* Grid lines */}
						{Array.from({ length: 10 }).map((_, i) => (
							<line
								key={`h-${i}`}
								x1={0}
								y1={i * (GRID.cellH + GRID.gap) + GRID.padY}
								x2={svgW}
								y2={i * (GRID.cellH + GRID.gap) + GRID.padY}
								stroke="var(--color-border)"
								strokeOpacity={0.15}
								strokeWidth={0.5}
							/>
						))}
						{Array.from({ length: 4 }).map((_, i) => (
							<line
								key={`v-${i}`}
								x1={i * (GRID.cellW + GRID.gap) + GRID.padX}
								y1={0}
								x2={i * (GRID.cellW + GRID.gap) + GRID.padX}
								y2={svgH}
								stroke="var(--color-border)"
								strokeOpacity={0.15}
								strokeWidth={0.5}
							/>
						))}

						{/* Connection lines between blocks */}
						<ConnectionLines blocks={blocks} />

						<AnimatePresence>
							{blocks.map((block) => (
								<BlueprintBlockEl key={block.id} block={block} />
							))}
						</AnimatePresence>
					</svg>
				)}
			</div>

			{/* Bottom labels — readable */}
			<div className="absolute bottom-3 left-4 right-4 flex justify-between items-center">
				<span className="text-[11px] font-mono font-semibold text-[var(--color-primary)] tracking-wider opacity-60">
					{blocks.length} {blocks.length === 1 ? "bloc" : "blocs"}
				</span>
				<span className="text-[11px] font-mono font-semibold text-[var(--color-accent)] tracking-wider opacity-70">
					{state.projectType === "creation" ? "CRÉATION" : state.projectType === "refonte" ? "REFONTE" : "—"}
				</span>
			</div>
		</div>
	);
}
