"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "./resizable";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface BeforeAfterSliderProps {
	beforeSrc: string;
	afterSrc: string;
	alt: string;
	className?: string;
	showLabels?: boolean;
	size?: "sm" | "md" | "lg";
	autoSlide?: boolean;
	slideDuration?: number;
}

export function BeforeAfterSlider({
	beforeSrc,
	afterSrc,
	alt,
	className = "",
	showLabels = true,
	size = "md",
	autoSlide = true,
	slideDuration = 2500,
}: BeforeAfterSliderProps) {
	const [defaultSize, setDefaultSize] = useState(50);
	const [isAnimating, setIsAnimating] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.4 });

	// Auto-slide when entering viewport: slide from "before" (50%) to ~60% "after"
	useEffect(() => {
		if (!autoSlide || !isInView || hasAnimated) return;

		const timer = setTimeout(() => {
			setIsAnimating(true);
			setDefaultSize(40); // 40% for before = 60% visible for "after"
			setHasAnimated(true);

			// Stop animation transition after it completes
			setTimeout(() => setIsAnimating(false), slideDuration + 100);
		}, 400);

		return () => clearTimeout(timer);
	}, [autoSlide, isInView, hasAnimated, slideDuration]);

	const sizeClasses = {
		sm: "w-full aspect-[16/9]",
		md: "w-full aspect-[16/9]",
		lg: "w-full aspect-[16/9]",
	};

	return (
		<div ref={ref} className={`relative ${className}`}>
			<div
				className={`${sizeClasses[size]} shadow-[var(--shadow)] ring-1 ring-[var(--color-border)] rounded-2xl overflow-hidden`}
			>
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel
						defaultSize={100 - defaultSize}
						style={{
							transition: isAnimating
								? `flex-basis ${slideDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
								: "none",
						}}
					>
						<div className="relative h-full">
							<Image
								src={beforeSrc}
								alt={`${alt} - Avant`}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover"
								priority={size === "lg"}
							/>
						</div>
					</ResizablePanel>

					<ResizableHandle
						withHandle
						className="slider-handle bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 transition-colors"
					/>

					<ResizablePanel
						defaultSize={defaultSize}
						style={{
							transition: isAnimating
								? `flex-basis ${slideDuration}ms cubic-bezier(0.22, 1, 0.36, 1)`
								: "none",
						}}
					>
						<div className="relative h-full shadow-[-8px_0_24px_-4px_rgba(0,0,0,0.15)]">
							<Image
								src={afterSrc}
								alt={`${alt} - Après`}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover"
								priority={size === "lg"}
							/>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>

			{/* Animated Labels Avant/Après */}
			{showLabels && (
				<div className="flex justify-between items-center mt-4 text-xs md:text-sm font-medium tracking-wide">
					<motion.span
						initial={{ opacity: 0, x: -10 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
						className="text-[var(--color-muted)] flex items-center gap-2"
					>
						<div className="w-2 h-2 rounded-full bg-[var(--color-muted)]" />
						Avant
					</motion.span>
					<motion.span
						initial={{ opacity: 0, x: 10 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
						className="text-[var(--color-muted)] flex items-center gap-2"
					>
						Après
						<div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
					</motion.span>
				</div>
			)}
		</div>
	);
}
