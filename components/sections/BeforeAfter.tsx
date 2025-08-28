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
		<section className="container py-24" id="avant-apres">
			<h2 className="h2 text-center mb-6">Avant / Après</h2>
			<p className="lead mb-12">
				Voyez l'impact d'une refonte moderne sur la perception.
			</p>
			<div
				ref={ref}
				className="ba-wrapper max-w-4xl mx-auto cursor-ew-resize select-none"
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
			<div className="flex justify-center gap-8 text-sm mt-4 text-[var(--color-muted)]">
				<span>Avant</span>
				<span>Après</span>
			</div>
		</section>
	);
}
