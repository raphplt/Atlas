"use client";
import Image from "next/image";
import { useState } from "react";
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "./resizable";

interface BeforeAfterSliderProps {
	beforeSrc: string;
	afterSrc: string;
	alt: string;
	className?: string;
	showLabels?: boolean;
	size?: "sm" | "md" | "lg";
}

export function BeforeAfterSlider({
	beforeSrc,
	afterSrc,
	alt,
	className = "",
	showLabels = true,
	size = "md",
}: BeforeAfterSliderProps) {
	const [defaultSize] = useState(50);

	const sizeClasses = {
		sm: "h-48 md:h-64",
		md: "h-64 md:h-80",
		lg: "h-80 md:h-96",
	};

	return (
		<div className={`relative ${className}`}>
			<div
				className={`${sizeClasses[size]} shadow-[var(--shadow)] ring-1 ring-[var(--color-border)] rounded-2xl overflow-hidden`}
			>
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel defaultSize={100 - defaultSize}>
						<div className="relative h-full">
							<Image
								src={afterSrc}
								alt={`${alt} - Après`}
								fill
								className="object-cover"
								priority={size === "lg"}
							/>
						</div>
					</ResizablePanel>

					<ResizableHandle
						withHandle
						className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 transition-colors"
					/>

					<ResizablePanel defaultSize={defaultSize}>
						<div className="relative h-full">
							<Image
								src={beforeSrc}
								alt={`${alt} - Avant`}
								fill
								className="object-cover"
								priority={size === "lg"}
							/>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>

			{/* Labels Avant/Après */}
			{showLabels && (
				<div className="flex justify-between items-center mt-4 text-xs md:text-sm font-medium tracking-wide">
					<span className="text-[var(--color-muted)] flex items-center gap-2">
						<div className="w-2 h-2 rounded-full bg-[var(--color-muted)]" />
						Avant
					</span>
					<span className="text-[var(--color-muted)] flex items-center gap-2">
						Après
						<div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
					</span>
				</div>
			)}
		</div>
	);
}
