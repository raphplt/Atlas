"use client";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";

export function BeforeAfter() {
	const ref = useRef<HTMLDivElement | null>(null);
	const [percent, setPercent] = useState(50);
	const onMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const x = "touches" in e ? e.touches[0].clientX : e.clientX;
		const p = ((x - rect.left) / rect.width) * 100;
		setPercent(Math.min(100, Math.max(0, p)));
	}, []);
	return (
		<section className="relative py-32 overflow-hidden" id="avant-apres">
			<div
				className="absolute inset-0 pattern-grid opacity-30"
				aria-hidden="true"
			/>
			<div className="aurora a1" />
			<div className="aurora a2" />
			<div className="container relative">
				<h2 className="h2 text-center mb-6">Avant / Après</h2>
				<p className="lead mb-12">
					Visualisez l'impact immédiat d'un design structuré, lisible et crédible.
				</p>
				<div
					ref={ref}
					className="ba-wrapper max-w-4xl mx-auto cursor-ew-resize select-none shadow-[var(--shadow)] ring-1 ring-[var(--color-border)]"
					onMouseMove={(e) => e.buttons === 1 && onMove(e)}
					onTouchMove={onMove}
				>
					<Image
						src="/images/placeholders/before.png"
						alt="Avant"
						fill
						className="object-cover"
					/>
					<div className="ba-after" style={{ width: `${percent}%` }}>
						<Image
							src="/images/placeholders/after.png"
							alt="Après"
							fill
							className="object-cover"
						/>
					</div>
					<div
						role="slider"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={percent}
						tabIndex={0}
						className="ba-handle"
						onKeyDown={(e) => {
							if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 5));
							if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 5));
						}}
						onMouseDown={(e) => onMove(e)}
						onTouchStart={onMove}
					>
						<div className="ba-dot">⇆</div>
					</div>
				</div>
				<div className="flex justify-center gap-12 text-xs md:text-sm mt-6 font-medium tracking-wide">
					<span className="text-[var(--color-muted)]">Avant</span>
					<span className="text-[var(--color-muted)]">Après</span>
				</div>
			</div>
		</section>
	);
}
